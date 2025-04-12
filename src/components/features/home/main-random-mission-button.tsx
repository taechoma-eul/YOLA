'use client';

import { useState } from 'react';
import RandomMissionModal from '@/components/features/modals/random-mission';

const MissionButton = ({ isLogin }: { isLogin: boolean }) => {
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
      {showModal && <RandomMissionModal clickModal={clickModal} isLogin={isLogin} />}
    </>
  );
};

export default MissionButton;
