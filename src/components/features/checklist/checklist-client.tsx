'use client';

import { useEffect, useState } from 'react';
import ChecklistProgress from '@/components/features/checklist/checklist-progress';
import MissionListClient from '@/components/features/checklist/mission-list-client';
import SkeletonChecklist from '@/components/features/checklist/skeleton-checklist';
import { PostDetailModal } from '@/components/features/modals/calendar-post-detail';
import { useGetChecklistData } from '@/lib/hooks/queries/use-get-checklist-data';
import { useGetLifePostByMissionId } from '@/lib/hooks/queries/use-get-life-post-by-mission-id';
import type { EnumLevel } from '@/types/supabase-const';

interface ChecklistClientProps {
  mission: string;
  userId: string | null;
}

const ChecklistClient = ({ mission, userId }: ChecklistClientProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(null);

  const { data: checklistData, isLoading } = useGetChecklistData({
    mission,
    userId
  });

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

  if (isLoading) {
    return <SkeletonChecklist />;
  }

  if (!checklistData) {
    return null;
  }

  const userLevel = checklistData.userLevel as EnumLevel;
  const progress = checklistData.progress;
  const isMaster = userLevel === '5' && progress === 5;

  return (
    <section className="w-full pt-[32px] md:pt-[59px]">
      <div className="flex w-full flex-col gap-[34px] pl-[37px] pr-[39px]">
        <section className="flex gap-[12px]">
          <h1 className="whitespace-nowrap text-[20px] font-semibold">{checklistData.decodedMission} 체크리스트</h1>
          {isMaster && (
            <figure className="border-mission-line text-mission-clear flex items-center gap-0.5 rounded-[18px] border px-2 py-1 text-[16px] font-semibold leading-[1.4]">
              CLEAR
            </figure>
          )}
        </section>
        <ChecklistProgress progress={progress} userLevel={userLevel} isMaster={isMaster} />
      </div>
      <MissionListClient
        setSelectedMissionId={setSelectedMissionId}
        missionList={checklistData.missionList}
        {...(userId && { userId })}
      />
      {selectedPost && showModal && (
        <PostDetailModal clickModal={handleCloseModal} showModal={showModal} post={selectedPost} />
      )}
    </section>
  );
};

export default ChecklistClient;
