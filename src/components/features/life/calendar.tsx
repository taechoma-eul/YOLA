'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CustomCalendarHeader from './custom-header';
import { useRef } from 'react';

type Props = {
  setDate: (date: string) => void;
  selectedDate: string;
  dotMap: Record<string, Set<'mission' | 'normal'>>;
  onMonthChange: (month: string) => void;
};

const Calendar = ({ setDate, selectedDate, dotMap, onMonthChange }: Props) => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const formatToKoreanDate = (date: Date): string => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kst = new Date(date.getTime() + kstOffset);
    const yyyy = kst.getFullYear();
    const mm = String(kst.getMonth() + 1).padStart(2, '0');
    const dd = String(kst.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleDatesSet = (arg: any) => {
    const month = arg.view.currentStart.toISOString().slice(0, 7); // 'YYYY-MM'
    onMonthChange(month);
  };

  const isSameMonth = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
  };

  const handleMoveMonth = (targetDateStr: string) => {
    setDate(targetDateStr); // YYYY-MM-DD
    onMonthChange(targetDateStr.slice(0, 7));

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(targetDateStr); // 달력 실제 이동
    }
  };

  return (
    <div>
      <CustomCalendarHeader selectedDate={selectedDate} onMoveMonth={handleMoveMonth} />

      <FullCalendar
        ref={calendarRef}
        headerToolbar={false}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={selectedDate}
        timeZone="Asia/Seoul"
        height={750}
        locale="ko"
        eventContent={() => null}
        dateClick={(arg) => {
          const clickedDate = arg.date;
          const dateStr = formatToKoreanDate(clickedDate); // YYYY-MM-DD

          const calendarApi = calendarRef.current?.getApi();
          if (!calendarApi) return;

          calendarApi.gotoDate(clickedDate); // ✅ 달력 이동
          setDate(dateStr); // ✅ 날짜 선택
          onMonthChange(dateStr.slice(0, 7)); // ✅ YYYY-MM 전달
        }}
        dayCellContent={(arg) => {
          const dateStr = arg.date.toISOString().split('T')[0];
          const types = dotMap[dateStr];
          const isSelected = selectedDate === dateStr;

          return (
            <div className="relative h-full w-full">
              <div className="pointer-events-none relative z-20 flex flex-col items-center justify-center">
                <span
                  className={`flex h-6 w-6 items-center justify-center font-mono text-sm font-medium ${
                    isSelected ? 'rounded-full bg-black text-white' : 'text-gray-800'
                  }`}
                >
                  {arg.date.getDate()}
                </span>
                <div className="mt-1 flex h-[28px] flex-col items-center justify-center space-y-[2px] text-[12px] font-light text-gray-500">
                  {types?.has('mission') && (
                    <div className="flex items-center space-x-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                      <span>미션인증</span>
                    </div>
                  )}
                  {types?.has('normal') && (
                    <div className="flex items-center space-x-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>하루일기</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
        datesSet={handleDatesSet}
      />
    </div>
  );
};

export default Calendar;
