'use client';

import { useMemo, useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth
} from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import CalendarHeader from '@/components/features/life/calendar/calendar-header';
import CalendarWeekdays from '@/components/features/life/calendar/calendar-weekdays';
import CalendarCell from '@/components/features/life/calendar/calendar-cell';
import { renderDot } from '@/components/features/life/calendar/calendar-render-dot';

interface Props {
  selectedDate: string;
  setDate: (date: string) => void;
  onMonthChange: (month: string) => void;
  dotMap: Record<string, Set<'mission' | 'normal'>>;
}

const CustomCalendar = ({ selectedDate, setDate, onMonthChange, dotMap }: Props) => {
  const [calendarMonth, setCalendarMonth] = useState(() => selectedDate.slice(0, 7));

  const moveMonth = (diff: number) => {
    const baseDate = new Date(calendarMonth + '-01');
    const next = diff > 0 ? addMonths(baseDate, diff) : subMonths(baseDate, Math.abs(diff));
    const newMonth = format(next, 'yyyy-MM');
    setCalendarMonth(newMonth);
    onMonthChange(newMonth);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => moveMonth(1),
    onSwipedRight: () => moveMonth(-1),
    trackMouse: true
  });

  const weeks = useMemo(() => {
    const baseDate = new Date(calendarMonth + '-01');
    const start = startOfMonth(baseDate);
    const end = endOfMonth(baseDate);

    const startIdx = getDay(start);
    const endIdx = getDay(end);

    const allDays = eachDayOfInterval({
      start: new Date(start.getFullYear(), start.getMonth(), 1 - startIdx),
      end: new Date(end.getFullYear(), end.getMonth(), 6 - endIdx + end.getDate())
    });

    const weeks: Date[][] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }
    return weeks;
  }, [calendarMonth]);

  const isSelected = (date: Date) => format(date, 'yyyy-MM-dd') === selectedDate;
  const isOutside = (date: Date) => !isSameMonth(date, new Date(calendarMonth + '-01'));

  return (
    <div className="mx-auto w-full max-w-[1280px] px-2 sm:px-4 lg:px-10">
      <CalendarHeader
        calendarMonth={calendarMonth}
        onMoveMonth={moveMonth}
        onResetToToday={() => {
          const today = format(new Date(), 'yyyy-MM-dd');
          setDate(today);
          const month = today.slice(0, 7);
          setCalendarMonth(month);
          onMonthChange(month);
        }}
      />

      <div className="flex flex-col items-center justify-start self-stretch" {...swipeHandlers}>
        <CalendarWeekdays />

        <AnimatePresence mode="wait">
          <motion.div
            key={calendarMonth}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start justify-start gap-1 self-stretch"
          >
            {weeks.map((week, rowIdx) => (
              <div key={rowIdx} className="inline-flex items-center justify-start self-stretch">
                {week.map((date) => {
                  const selected = isSelected(date);
                  const outside = isOutside(date);
                  const dateStr = format(date, 'yyyy-MM-dd');

                  return (
                    <CalendarCell
                      key={dateStr}
                      date={date}
                      isSelected={selected}
                      isOutside={outside}
                      onClick={() => {
                        if (outside) {
                          const newMonth = format(date, 'yyyy-MM');
                          setCalendarMonth(newMonth);
                          onMonthChange(newMonth);
                        }
                        setDate(dateStr);
                      }}
                      renderDot={renderDot(dotMap)}
                    />
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomCalendar;
