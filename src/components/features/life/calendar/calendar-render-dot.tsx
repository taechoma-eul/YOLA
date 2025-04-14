// components/calendar/calendar-render-dot.tsx
import { format } from 'date-fns';
import React from 'react';

export const renderDot = (
  dotMap: Record<string, Set<'mission' | 'normal'>>
): ((date: Date, isOutside: boolean) => React.ReactNode) => {
  return (d, o) => {
    const dateStr = format(d, 'yyyy-MM-dd');
    const dots = dotMap[dateStr];
    const dotTextColor = o ? 'text-gray-300' : 'text-zinc-500';
    const missionColor = o ? 'bg-rose-200' : 'bg-rose-400';
    const normalColor = o ? 'bg-zinc-300' : 'bg-zinc-800';

    return (
      <div className="flex h-14 w-full select-none flex-col items-center justify-start gap-1 overflow-hidden px-2.5 py-[3px]">
        <div className="flex flex-col items-start justify-start gap-0.5">
          {dots?.has('mission') && (
            <div className="inline-flex items-center justify-start gap-1">
              <div className={`h-1.5 w-1.5 rounded-full ${missionColor}`} />
              <div className={`justify-center text-center text-xs font-normal leading-none ${dotTextColor}`}>
                미션인증
              </div>
            </div>
          )}
          {dots?.has('normal') && (
            <div className="inline-flex items-center justify-start gap-1">
              <div className={`h-1.5 w-1.5 rounded-full ${normalColor}`} />
              <div className={`justify-center text-center text-xs font-normal leading-none ${dotTextColor}`}>
                하루일기
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
};
