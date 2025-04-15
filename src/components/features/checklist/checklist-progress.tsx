import type { Level } from '@/types/checklist';

interface ChecklistProgressProps {
  progress: number;
  userLevel: Level;
}

const ChecklistProgress = async ({ progress, userLevel }: ChecklistProgressProps) => {
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
    <div>
      {/* 진행도 바 */}
      <div className="flex-1 pt-[10px]">
        <div className="flex flex-col gap-1">
          <div className="flex h-3 w-full overflow-hidden rounded-md bg-gray-300">
            {progressBar.map((bar, idx) => {
              if (bar.type === 'full') return <div key={idx} className="flex-1 bg-black" />;

              if (bar.type === 'partial') {
                const segments = Array.from({ length: 5 });
                return (
                  <div key={idx} className="flex flex-1 gap-[2px] bg-gray-300 px-[2px]">
                    {segments.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm ${i < Math.min(bar.completed, 5) ? 'bg-black' : 'bg-gray-400'}`}
                      />
                    ))}
                  </div>
                );
              }

              return <div key={idx} className="flex-1 bg-gray-200" />;
            })}
          </div>
          <div className="flex justify-between px-1 text-xs text-gray-600">
            {levels.map((label, idx) => (
              <span key={idx} className="flex-1 text-center">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistProgress;
