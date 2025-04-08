'use client';

import { useState } from 'react';
import RandomMissionModal from '@/components/features/modals/random-mission';
import { ChevronRight } from 'lucide-react';

interface ButtonClientComponentProps {
  isLogin: boolean;
}

const ButtonClientComponent = ({ isLogin }: ButtonClientComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <div>
      <button onClick={clickModal} className="flex">
        미션 받으러 가기
        <ChevronRight />
      </button>
      {showModal && <RandomMissionModal clickModal={clickModal} isLogin={isLogin} />}
    </div>
  );
};

export default ButtonClientComponent;
