'use client';

import { useState } from 'react';
import RandomMissionModal from '../modals/random-mission';

type ButtonClientComponentProps = {
  isLogin: boolean;
};

const ButtonClientComponent = ({ isLogin }: ButtonClientComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <div>
      <button onClick={clickModal}>랜덤 미션 뽑기</button>
      {showModal && <RandomMissionModal clickModal={clickModal} isLogin={isLogin} />}
    </div>
  );
};

export default ButtonClientComponent;
