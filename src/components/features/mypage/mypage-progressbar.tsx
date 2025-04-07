'use client';

import { USER_LEVELS } from '@/lib/utils/calculate-user-level';
import { useEffect, useState } from 'react';

interface MypageProgressBarProps {
  level: string;
}

const MypageProgressBar = ({ level }: MypageProgressBarProps) => {
  //progress bar 시작위치 : 초기값 0
  const [currentStep, setCurrentStep] = useState<number>(0);

  const levelStepMap = {
    [USER_LEVELS.START]: 0,
    [USER_LEVELS.BEGINNER]: 1,
    [USER_LEVELS.NOVICE]: 2,
    [USER_LEVELS.INTERMEDIATE]: 3,
    [USER_LEVELS.EXPERT]: 4,
    [USER_LEVELS.MASTER]: 5
  } as const;

  type LevelKey = keyof typeof levelStepMap;

  useEffect(() => {
    setCurrentStep(levelStepMap[level as LevelKey] ?? 0);
  }, [level]);

  // 진행 상태에 맞는 색상 채우기
  const progressWidth = `${(currentStep / 5) * 100}%`;

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="relative flex items-center justify-between">
        {/* 레벨 현황 bar*/}
        <div className="relative h-2 w-full rounded-md bg-gray-300">
          <div className="absolute left-0 top-0 h-full rounded-md bg-orange-500" style={{ width: progressWidth }}></div>
        </div>
      </div>

      {/* 유저 레벨 라벨 */}
      <div className="mt-2 flex justify-between">
        {Object.values(USER_LEVELS).map((level) => (
          <span key={level} className="text-sm">
            {level}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MypageProgressBar;
