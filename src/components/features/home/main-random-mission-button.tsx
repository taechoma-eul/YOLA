'use client';

import { useState } from 'react';
import { CustomButton } from '@/components/ui/custom-button';
import RandomMissionModal from '@/components/features/modals/random-mission';
import type { Tables } from '@/types/supabase';

interface ButtonProps {
  isLogin: boolean;
  missionData: Tables<'mission_list'>[];
}

const MissionButton = ({ isLogin, missionData }: ButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const clickModal = () => setShowModal(!showModal);
  return (
    <>
      <CustomButton variant="outline" onClick={clickModal}>
        미션뽑기
      </CustomButton>
      {showModal && (
        <RandomMissionModal
          showModal={showModal}
          clickModal={clickModal}
          missionsData={missionData}
          isLogin={isLogin}
        />
      )}
    </>
  );
};

export default MissionButton;
