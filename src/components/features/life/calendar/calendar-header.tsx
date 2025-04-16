import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  calendarMonth: string;
  onMoveMonth: (diff: number) => void;
  onResetToToday: () => void;
}

const CalendarHeader = ({ calendarMonth, onMoveMonth, onResetToToday }: CalendarHeaderProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-center">
      {/* 가운데 정렬된 월 + 화살표 */}
      <div className="ml-3 flex items-center justify-center gap-4 sm:ml-auto sm:gap-10">
        <button onClick={() => onMoveMonth(-1)} className="flex h-6 w-6 items-center justify-center">
          <ChevronLeft className="h-5 w-5 text-zinc-800 sm:h-6 sm:w-6" />
        </button>
        <div className="text-center text-base font-semibold leading-6 text-zinc-800 sm:text-lg">
          {calendarMonth.replace('-', '.')}
        </div>
        <button onClick={() => onMoveMonth(1)} className="flex h-6 w-6 items-center justify-center">
          <ChevronRight className="h-5 w-5 text-zinc-800 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* TODAY 버튼 */}
      <button
        onClick={onResetToToday}
        className="ml-auto mt-2 rounded px-2 py-1 text-sm outline outline-1 outline-zinc-800 sm:mt-0"
      >
        TODAY
      </button>
    </div>
  );
};

export default CalendarHeader;
