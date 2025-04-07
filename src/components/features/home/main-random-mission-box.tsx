'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RandomMissionContainer from '@/components/features/home/main-random-mission-container';
import RandomMissionModal from '@/components/features/modals/random-mission';
import TitleBox from '@/components/features/home/main-random-title-box';

const RandomMissionBox = ({ isLogin }: { isLogin: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <RandomMissionContainer>
      <div className="inline-flex w-60 flex-col items-start justify-start gap-24">
        <TitleBox />
        <Button onClick={clickModal} className="w-full border-2 bg-white text-xs text-black shadow-none">
          랜덤미션 뽑기
        </Button>
        {showModal && <RandomMissionModal clickModal={clickModal} isLogin={isLogin} />}
      </div>
      <div className="h-64 w-56 bg-zinc-300">뽑기 이미지</div>
    </RandomMissionContainer>
  );
};

export default RandomMissionBox;
