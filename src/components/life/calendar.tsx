'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export type CalendarProps = {
  events: {
    title: string;
    date: string;
  };
};

const Calendar = () => {
  const events = [
    { title: 'Event 1', date: '2025-04-01' },
    { title: 'Event 2', date: '2025-04-02' },
    { title: 'Event 3', date: '2025-04-03' },
    { title: 'Event 4', date: '2025-04-04' },
    { title: 'Event 5', date: '2025-04-05' }
  ];
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />;
};

export default Calendar;
