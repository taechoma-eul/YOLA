'use client';

import { useEffect, useState } from 'react';
import { USER_LEVELS } from '@/lib/utils/calculate-user-level';

interface MypageProgressBarProps {
  level: string;
}

const MypageProgressBar = ({ level }: MypageProgressBarProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const totalSteps = 5;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;
  const stepLabels = Object.values(USER_LEVELS) as string[];

  useEffect(() => {
    const index = stepLabels.indexOf(level);
    setCurrentStep(index === -1 ? 0 : index);
  }, [level, stepLabels]);

  return (
    <div className="gap-3 rounded-[8px] border border-secondary-grey-400 p-10">
      <div className="relative flex items-center justify-between">
        {/* Progress Bar */}
        <div className="relative h-[10px] w-full rounded-full bg-secondary-grey-200">
          {/* 채워지는 부분 */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary-orange-400 transition-all duration-300"
            style={{ width: progressWidth }}
          />

          {/* 카테고리 사이 세로 구분선 */}
          {[...Array(totalSteps + 1)].map((_, idx) => (
            <div
              key={idx}
              className="absolute top-[-6px] h-6 w-px bg-white"
              style={{ left: `${(idx / totalSteps) * 100}%` }}
            />
          ))}

          {/* 현재 단계 circle 표시 */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `calc(${(currentStep / totalSteps) * 100}% )` }}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-[5px] border-primary-orange-400 bg-white" />
          </div>
        </div>
      </div>

      {/* 라벨 - 동그라미와 수직 정렬 */}
      <div className="relative mt-3 h-5">
        {[...Array(totalSteps + 1)].map((_, idx) => (
          <div
            key={idx}
            className="absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap text-sm text-secondary-grey-900"
            style={{ left: `${(idx / totalSteps) * 100}%` }}
          >
            {stepLabels[idx]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MypageProgressBar;
