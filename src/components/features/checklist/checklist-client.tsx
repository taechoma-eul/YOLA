'use client';

import MissionListClient from '@/components/features/checklist/mission-list-client';
import ChecklistProgress from '@/components/features/checklist/checklist-progress';
import type { Level, MissionWithStatus } from '@/types/checklist';
import { useEffect, useState } from 'react';
import { PostDetailModal } from '../modals/calendar-post-detail';
import { useGetLifePostByMissionId } from '@/lib/hooks/queries/use-get-life-post-by-mission-id';

interface ChecklistClientProps {
  decodedMission: string;
  userId: string | null;
  userLevel: string;
  progress: number;
  missionList: MissionWithStatus[];
}

const ChecklistClient = ({ decodedMission, userId, userLevel, progress, missionList }: ChecklistClientProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);

  const { data: selectedPost } = useGetLifePostByMissionId(selectedMissionId);

  useEffect(() => {
    if (selectedPost) {
      setShowModal(true);
    }
  }, [selectedPost]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMissionId(null);
  };

  return (
    <section className="w-full pl-[37px] pr-[39px] pt-[59px]">
      <div className="flex w-full flex-col gap-[34px]">
        <h1 className="whitespace-nowrap text-2xl font-bold">{decodedMission} 체크리스트</h1>
        <ChecklistProgress progress={progress} userLevel={userLevel as Level} />
      </div>
      <MissionListClient
        setSelectedMissionId={setSelectedMissionId}
        missionList={missionList}
        {...(userId && { userId })}
      />
      {selectedPost && showModal && (
        <PostDetailModal clickModal={handleCloseModal} showModal={showModal} post={selectedPost} />
      )}
    </section>
  );
};

export default ChecklistClient;
