'use client';

import { useState } from 'react';
import RandomMissionModal from '@/components/features/modals/random-mission';
import { ChevronRight } from 'lucide-react';
import type { Tables } from '@/types/supabase';

interface ButtonClientComponentProps {
  missionsData: Tables<'mission_list'>[];
  isLogin: boolean;
}

const ButtonClientComponent = ({ missionsData, isLogin }: ButtonClientComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <div>
      <button onClick={clickModal} className="flex">
        미션 받으러 가기
        <ChevronRight />
      </button>
      {showModal && (
        <RandomMissionModal
          missionsData={missionsData}
          clickModal={clickModal}
          showModal={showModal}
          isLogin={isLogin}
        />
      )}
    </div>
  );
};

export default ButtonClientComponent;
