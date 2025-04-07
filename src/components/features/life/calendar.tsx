'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getToday } from '@/lib/utils/get-today';

type Props = {
  setDate: (date: string) => void;
  selectedDate: string;
  dotMap: Record<string, Set<'mission' | 'normal'>>;
  onMonthChange: (month: string) => void;
};

const MyCalendar = ({ setDate, selectedDate, dotMap, onMonthChange }: Props) => {
  const formatToKoreanDate = (date: Date): string => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kst = new Date(date.getTime() + kstOffset);
    const yyyy = kst.getFullYear();
    const mm = String(kst.getMonth() + 1).padStart(2, '0');
    const dd = String(kst.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const TODAY = getToday();

  const handleDatesSet = (arg: any) => {
    const month = arg.view.currentStart.toISOString().slice(0, 7); // 'YYYY-MM'
    onMonthChange(month);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: 'prev',
        center: 'title',
        end: 'today next'
      }}
      initialDate={selectedDate}
      timeZone="Asia/Seoul"
      dayCellContent={(arg) => {
        const dateStr = arg.date.toISOString().split('T')[0];
        const types = dotMap[dateStr];
        const isSelected = selectedDate === dateStr;

        return (
          <div className="relative h-full w-full">
            {/* 클릭 가능한 레이어 */}
            <button type="button" className="absolute inset-0 z-10 h-full w-full cursor-pointer" />

            {/* 내용 */}
            <div className="pointer-events-none relative z-20 flex flex-col items-center justify-center">
              <span
                className={`p-1 text-sm font-medium ${
                  isSelected ? 'rounded-full bg-yellow-400 text-black' : 'text-gray-800'
                }`}
              >
                {arg.dayNumberText}
              </span>
              <div className="mt-1 flex min-h-[6px] space-x-1">
                {types?.has('mission') && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                {types?.has('normal') && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
              </div>
            </div>
          </div>
        );
      }}
      dateClick={(arg) => {
        const clickedDate = arg.date;
        setDate(formatToKoreanDate(clickedDate));
      }}
      eventContent={() => null}
      height={750}
      datesSet={handleDatesSet}
    />
  );
};

export default MyCalendar;
