'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type CustomCalendarHeaderProps = {
  selectedDate: string; // YYYY-MM-DD
  onMoveMonth: (newDateStr: string) => void;
};

const CustomCalendarHeader = ({ selectedDate, onMoveMonth }: CustomCalendarHeaderProps) => {
  const current = new Date(selectedDate);
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, '0');

  const moveMonth = (offset: number) => {
    // 항상 "1일" 기준으로 날짜 설정 (예: 2025-05-01)
    const newDate = new Date(current.getFullYear(), current.getMonth() + offset, 1);
    const newDateStr = newDate.toLocaleDateString('sv-SE'); // YYYY-MM-DD
    onMoveMonth(newDateStr);
  };

  return (
    <div className="mb-4 flex items-center justify-center gap-4 text-lg font-semibold">
      <button onClick={() => moveMonth(-1)} className="text-xl">
        <ChevronLeft className="h-8 w-8 p-1" />
      </button>
      <span className="mx-6">{`${year}.${month}`}</span>
      <button onClick={() => moveMonth(1)} className="text-xl">
        <ChevronRight className="h-8 w-8 p-1" />
      </button>
    </div>
  );
};

export default CustomCalendarHeader;
