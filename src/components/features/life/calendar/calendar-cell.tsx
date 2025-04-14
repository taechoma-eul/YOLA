// components/calendar/CalendarCell.tsx
const CalendarCell = ({
  date,
  isSelected,
  isOutside,
  onClick,
  renderDot
}: {
  date: Date;
  isSelected: boolean;
  isOutside: boolean;
  onClick: () => void;
  renderDot: (d: Date, o: boolean) => React.ReactNode;
}) => {
  return (
    <div
      data-value={!isOutside}
      className="inline-flex h-[88px] min-w-0 flex-1 flex-col items-center justify-start gap-1 overflow-hidden px-[2px] sm:h-[100px] sm:px-2 md:h-[110px]"
    >
      <button onClick={onClick} className="flex h-full w-full flex-col items-center justify-start gap-2.5">
        <div
          className={`flex h-7 w-7 flex-col items-center justify-center gap-2.5 ${
            isSelected ? 'rounded-2xl bg-amber-500 p-0.5' : ''
          }`}
        >
          <div
            className={`text-center text-base ${
              isSelected ? 'font-bold text-white' : isOutside ? 'text-gray-300' : 'text-black'
            }`}
          >
            {date.getDate()}
          </div>
        </div>
        {renderDot(date, isOutside)}
      </button>
    </div>
  );
};

export default CalendarCell;
