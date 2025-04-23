'use client';

import { Dispatch, SetStateAction } from 'react';
import ChecklistMissionSwiper from '@/components/features/checklist/checklist-mission-swiper';
import MissionCardWrapper from '@/components/features/checklist/mission-card-wrapper';
import type { MissionWithStatus } from '@/types/checklist';

interface ClientMissionListProps {
  setSelectedMissionId: Dispatch<SetStateAction<number | null>>;
  missionList: MissionWithStatus[];
  userId?: string;
}

const MissionListClient = ({ setSelectedMissionId, missionList, userId }: ClientMissionListProps) => {
  return (
    <div>
      <section className="mb-[36px] mt-[92px] block w-full md:hidden">
        <ChecklistMissionSwiper missionList={missionList} userId={userId} onCompletedClick={setSelectedMissionId} />
      </section>

      <ul className="mt-[129px] hidden w-full max-w-[1200px] items-center gap-[24px] md:flex">
        {missionList.map((mission) => (
          <li key={mission.id}>
            <MissionCardWrapper mission={mission} userId={userId} onCompletedClick={setSelectedMissionId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionListClient;
