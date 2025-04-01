'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function MyCalendar({ setDate }: { setDate: (date: string) => void }) {
  const formatToKoreanDate = (date: Date): string => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kst = new Date(date.getTime() + kstOffset);
    const yyyy = kst.getFullYear();
    const mm = String(kst.getMonth() + 1).padStart(2, '0');
    const dd = String(kst.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  const handleEventClick = (arg: any) => {
    const clickedDate = arg.event.start; // Date 객체
    setDate(formatToKoreanDate(clickedDate));
  };

  const handleDatesSet = (arg: any) => {
    const startDate = arg.view.currentStart; // Date 객체
    setDate(formatToKoreanDate(startDate));
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: '',
        center: 'title',
        end: 'today prev,next'
      }}
      timeZone="local"
      locale="ko"
      events={[
        { title: '팀 회의', start: '2025-04-02' },
        { title: '디자인 마감', start: '2025-04-10', end: '2025-04-12' }
      ]}
      dayCellContent={(arg) => <div className="text-xs font-bold text-gray-100">{arg.dayNumberText}</div>}
      eventContent={(arg) => (
        <div className="mb-1 cursor-pointer rounded bg-blue-100 px-1 py-0.5 text-sm text-blue-800">
          {arg.event.title}
        </div>
      )}
      eventClick={handleEventClick}
      datesSet={handleDatesSet}
      height={750}
    />
  );
}
