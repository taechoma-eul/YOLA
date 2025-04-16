'use client';

import MissionListClient from '@/components/features/checklist/mission-list-client';
import ChecklistProgress from '@/components/features/checklist/checklist-progress';
import type { Level, MissionWithStatus } from '@/types/checklist';

interface ChecklistClientProps {
  decodedMission: string;
  userId: string | null;
  userLevel: string;
  progress: number;
  missionList: MissionWithStatus[];
}

const ChecklistClient = ({ decodedMission, userId, userLevel, progress, missionList }: ChecklistClientProps) => {
  return (
    <section className="w-full pl-[37px] pr-[39px] pt-[59px]">
      <div className="flex w-full flex-col gap-[34px]">
        <h1 className="whitespace-nowrap text-2xl font-bold">{decodedMission} 체크리스트</h1>
        <ChecklistProgress progress={progress} userLevel={userLevel as Level} />
      </div>
      <MissionListClient missionList={missionList} {...(userId && { userId })} />
    </section>
  );
};

export default ChecklistClient;
