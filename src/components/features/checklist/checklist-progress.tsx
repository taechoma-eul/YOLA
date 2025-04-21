import { Lock, Unlock } from 'lucide-react';
import type { EnumLevel } from '@/types/supabase-const';

interface ChecklistProgressProps {
  progress: number;
  userLevel: EnumLevel;
}

const ChecklistProgress = ({ progress, userLevel }: ChecklistProgressProps) => {
  const TOTAL_LEVELS = 5;
  const levels = ['1단계', '2단계', '3단계', '4단계', '5단계'];

  const progressBar = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
    const level = (i + 1).toString();
    const isPast = Number(level) < Number(userLevel);
    const isCurrent = level === userLevel;

    if (isPast) return { type: 'full' as const };
    if (isCurrent) return { type: 'partial' as const, completed: progress };
    return { type: 'empty' as const };
  });

  return (
    <section>
      <div className="relative flex-1 pt-[10px]">
        <div className="flex flex-col gap-1">
          {/* 진행도 바 */}
          <div className="flex h-3 w-full overflow-hidden rounded-md">
            {progressBar.map((bar, idx) => {
              if (bar.type === 'full') return <div key={idx} className="flex-1 bg-black" />;

              if (bar.type === 'partial') {
                return (
                  <div key={idx} className="flex flex-1 gap-[2px] bg-secondary-grey-200 px-[2px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm ${i < Math.min(bar.completed, 5) ? 'bg-secondary-grey-900' : 'bg-secondary-grey-500'}`}
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
              const isUnlocked = isPast || isCurrent; // 현재 단계 또는 이미 지난 단계는 풀린 상태
              const position = `${((idx + 1) / TOTAL_LEVELS) * 100}%`;

              return (
                <div
                  key={idx}
                  className="absolute flex justify-end"
                  style={{
                    left: position,
                    transform: 'translateX(-100%)',
                    top: '12px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div className="relative flex items-center">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        isCurrent
                          ? 'rounded-lg bg-secondary-grey-900 px-3 py-2.5 text-[16px] text-white'
                          : 'rounded-[12px] border border-secondary-grey-400 px-3 py-2.5 text-[12px] font-normal text-secondary-grey-800'
                      }`}
                    >
                      {label}
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
