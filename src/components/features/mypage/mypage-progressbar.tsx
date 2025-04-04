'use client';

import { USER_LEVELS } from '@/lib/utils/calculate-user-level';
import { useEffect, useState } from 'react';

type MypageProgressBarProps = {
  level: string;
};
const MypageProgressBar = ({ level }: MypageProgressBarProps) => {
  //progress bar 시작위치 : 초기값 0
  const [currentStep, setCurrentStep] = useState(0);

  // level에 따른 currentStep 할당
  useEffect(() => {
    switch (level) {
      case USER_LEVELS.START:
        setCurrentStep(0);
        break;
      case USER_LEVELS.BEGINNER:
        setCurrentStep(1);
        break;
      case USER_LEVELS.NOVICE:
        setCurrentStep(2);
        break;
      case USER_LEVELS.INTERMEDIATE:
        setCurrentStep(3);
        break;
      case USER_LEVELS.EXPERT:
        setCurrentStep(4);
        break;
      case USER_LEVELS.MASTER:
        setCurrentStep(5);
        break;
      default:
        setCurrentStep(0);
    }
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
        {LEVEL_NAME.map((level) => (
          <span key={level} className="text-sm">
            {level}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MypageProgressBar;

const LEVEL_NAME = ['', '입문', '초보', '중수', '고수', '마스터'];
