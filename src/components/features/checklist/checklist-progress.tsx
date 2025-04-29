import { clsx } from 'clsx';
import { Lock, Unlock } from 'lucide-react';
import type { EnumLevel } from '@/types/supabase-const';

interface ChecklistProgressProps {
  progress: number;
  userLevel: EnumLevel;
  isMaster: boolean;
}

const ChecklistProgress = ({ progress, userLevel, isMaster }: ChecklistProgressProps) => {
  const TOTAL_LEVELS = 5;
  const levels = ['1단계', '2단계', '3단계', '4단계', '5단계'];

  const progressBar = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
    const level = (i + 1).toString();
    const isPast = Number(level) < Number(userLevel);
    const isCurrent = level === userLevel;

    if (isMaster) return { type: 'master' as const };
    if (isPast) return { type: 'full' as const };
    if (isCurrent) return { type: 'partial' as const, completed: progress };
    return { type: 'empty' as const };
  });

  return (
    <section>
      <div className="relative flex-1 pt-[10px]">
        <div className="flex flex-col gap-1">
          {/* 진행도 바 */}
          <div className="flex h-3 w-full gap-[4px] overflow-hidden rounded-md">
            {progressBar.map((bar, idx) => {
              if (bar.type === 'master') return <div key={idx} className="bg-mission-line flex-1" />;
              if (bar.type === 'full') return <div key={idx} className="flex-1 bg-primary-orange-400" />;
              if (bar.type === 'partial') {
                return (
                  <div key={idx} className="gap-[2px]px-[2px] flex flex-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm ${i < Math.min(bar.completed, 5) ? 'bg-primary-orange-400' : 'bg-secondary-grey-400'}`}
                      />
                    ))}
                  </div>
                );
              }
              return <div key={idx} className="flex-1 bg-secondary-grey-200" />;
            })}
          </div>

          {/* 단계 말풍선 */}
          <div className="relative w-full">
            {levels.map((label, idx) => {
              const level = (idx + 1).toString();
              const isPast = Number(level) < Number(userLevel);
              const isCurrent = level === userLevel;
              const isUnlocked = isPast || isCurrent;
              const position = `${((idx + 0.5) / TOTAL_LEVELS) * 100}%`;

              return (
                <div
                  key={idx}
                  className="absolute left-0 top-[12px] flex w-full justify-center"
                  style={{
                    transform: `translateX(calc(${position} - 50%))`,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div className="relative flex items-center">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1 rounded-[12px]',
                        isCurrent
                          ? 'h-[37px] w-[63px] bg-secondary-grey-900 px-2 py-[10px] text-[12px] text-white md:h-[42px] md:w-[79px] md:px-3 md:py-2.5 md:text-[16px]'
                          : 'h-[38px] w-[38px] border border-secondary-grey-400 p-[12px] text-[12px] font-normal text-secondary-grey-800 md:h-[41px] md:w-[71px] md:px-3 md:py-2.5',
                        !isCurrent && 'justify-center md:justify-start'
                      )}
                    >
                      <span className={clsx('md:inline', !isCurrent && 'hidden')}>{label}</span>
                      {isUnlocked ? (
                        <Unlock className="h-[16px] w-[16px] shrink-0" />
                      ) : (
                        <Lock className="h-[14px] w-[14px] shrink-0" />
                      )}
                    </span>
                    {isCurrent && (
                      <div className="absolute left-1/2 top-[-6px] -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-secondary-grey-900" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChecklistProgress;
