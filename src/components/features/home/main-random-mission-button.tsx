'use client';

import { useState } from 'react';
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
      <button
        data-priority="Secondary"
        data-size="Medium"
        data-status="Default"
        onClick={clickModal}
        className="gap-2.5 self-stretch rounded-xl bg-white px-4 py-2.5 text-center leading-snug outline outline-1"
      >
        미션뽑기
      </button>
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
