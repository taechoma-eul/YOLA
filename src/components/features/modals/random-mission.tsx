'use client';
import type { Tables } from '@/types/supabase';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

/*
Step 1. 사용할 페이지 서버컴포넌트에서 이 코드를 추가해주세요
const missionsData = await getMissions();

Step 2. 호출할 클라이언트 컴포넌트로 missionsData와 isLogin을 props로 넘겨주세요

Step 3. 클라이언트 컴포넌트에서 이 코드를 추가해주세요
const [showModal, setShowModal] = useState(false);
const clickModal = () => setShowModal(!showModal);

Step 4. 클릭하는 부분에 이 코드를 추가해주세요
<button onClick={clickModal}>랜덤 미션 뽑기</button>

Step 5. 4번의 버튼 바깥에 이 코드를 추가해주세요
{showModal && <RandomMissionModal missions={missions} clickModal={clickModal} showModal={showModal} isLogin={isLogin} />}
 */
interface RandomMissionModalProps {
  missionsData: Tables<'mission_list'>[];
  clickModal: Function;
  showModal: boolean;
  isLogin: boolean;
}

const TIME_OUT = 1250;
const RandomMissionModal = ({ missionsData, clickModal, showModal, isLogin }: RandomMissionModalProps) => {
  const [randomMission, setRandomMission] = useState<string>('');

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (showModal) {
      document.body.style.overflow = 'hidden'; //모달이 클릭되면 배경에 스크롤 막음
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false }); //모바일에서도 막음
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [showModal]);

  const handleRandomMission = () => {
    const randomIndex = Math.floor(Math.random() * missionsData.length);
    const randomMissionData = missionsData[randomIndex];
    setRandomMission(randomMissionData.content);
  };

  const RandomMissionWithLoadingSpinner = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, TIME_OUT);

      return () => clearTimeout(timer);
    }, []);

    if (!showContent) {
      return (
        <div className="relative h-44 w-[462px] rounded-2xl">
          <div className="absolute left-0 top-[69px] inline-flex w-[462px] items-center justify-center gap-2.5 p-2.5">
            <FadeLoader />
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-44 w-[462px] rounded-2xl bg-gray-50">
        <div className="absolute left-0 top-[69px] inline-flex w-[462px] items-center justify-center gap-2.5 p-2.5">
          <div className="justify-start text-center font-['Pretendard'] text-2xl font-semibold leading-loose text-zinc-800">
            {randomMission}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={() => clickModal()} // 배경 클릭하면 모달 나가기
      className="fixed left-0 top-0 z-[51] flex h-full w-full items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 안을 클릭 했을 때 나가는 것 막음
        className="relative h-96 w-[598px] overflow-hidden rounded-[20px] bg-white"
      >
        <div className="absolute right-[30px] top-[30px] z-[52] h-7 w-7 cursor-pointer">
          <X onClick={() => clickModal()} className="h-full w-full" />
        </div>
        <div className="absolute left-[68px] top-[60px] inline-flex h-80 w-[462px] flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-start gap-2.5 self-stretch">
            <div className="justify-start self-stretch text-center font-['Pretendard'] text-2xl font-semibold leading-loose text-zinc-800">
              오늘의 랜덤 미션
            </div>
            <div className="justify-start self-stretch text-center font-['Pretendard'] text-base font-normal leading-snug text-zinc-800">
              {isLogin ? <p>두근두근 뭐가 나올까?</p> : <p>더 많은 미션을 원하시면 회원가입하세요!</p>}
            </div>
          </div>
          {randomMission ? (
            <RandomMissionWithLoadingSpinner />
          ) : (
            <div className="relative h-44 w-[462px] overflow-hidden"></div>
          )}
          <div
            data-priority="Primary"
            data-size="Medium"
            data-status="Default"
            className="inline-flex w-56 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-amber-400 px-4 py-2.5"
            onClick={() => handleRandomMission()}
          >
            <button
              type="button"
              className="justify-start font-['Pretendard'] text-base font-semibold leading-snug text-zinc-800"
            >
              {randomMission ? '다시 뽑기' : '뽑기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMissionModal;
