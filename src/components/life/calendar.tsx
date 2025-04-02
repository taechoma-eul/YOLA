'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useMemo } from 'react';

export default function MyCalendar({ setDate }: { setDate: (date: string) => void }) {
  const events = [
    {
      title: '혼자 떠돌이 타고 하남까지 갔다!',
      start: '2025-03-27T00:00:00+09:00',
      extendedProps: { isMission: true }
    },
    {
      title: '일반 일기 내용',
      start: '2025-03-27T00:00:00+09:00',
      extendedProps: { isMission: false }
    },
    {
      title: '일반 일기 내용',
      start: '2025-03-24T00:00:00+09:00',
      extendedProps: { isMission: true }
    },
    {
      title: '일반 일기 내용',
      start: '2025-03-28T00:00:00+09:00',
      extendedProps: { isMission: false }
    }
  ];

  const formatToKoreanDate = (date: Date): string => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kst = new Date(date.getTime() + kstOffset);
    const yyyy = kst.getFullYear();
    const mm = String(kst.getMonth() + 1).padStart(2, '0');
    const dd = String(kst.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // 날짜별 점 정리 (Set으로 미션/일반 모두 기록)
  const dotMap = useMemo(() => {
    const map: Record<string, Set<'mission' | 'normal'>> = {};
    for (const ev of events) {
      const date = ev.start.split('T')[0]; // 'YYYY-MM-DD'
      if (!map[date]) {
        map[date] = new Set();
      }
      const type = ev.extendedProps?.isMission ? 'mission' : 'normal';
      map[date].add(type);
    }
    return map;
  }, [events]);

  const handleEventClick = (arg: any) => {
    const clickedDate = arg.event.start;
    setDate(formatToKoreanDate(clickedDate));
  };

  const handleDatesSet = (arg: any) => {
    const startDate = arg.view.currentStart;
    setDate(formatToKoreanDate(startDate));
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: 'prev',
        center: 'title',
        end: 'today next'
      }}
      locale="ko"
      timeZone="local"
      events={events}
      dayCellContent={(arg) => {
        const dateStr = arg.date.toISOString().split('T')[0];
        const types = dotMap[dateStr];

        return (
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-sm font-medium text-gray-800">{arg.dayNumberText}</span>
            <div className="mt-1 flex space-x-1">
              {types?.has('mission') && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
              {types?.has('normal') && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
            </div>
          </div>
        );
      }}
      eventContent={() => null}
      eventClick={handleEventClick}
      datesSet={handleDatesSet}
      height={750}
    />
  );
}
