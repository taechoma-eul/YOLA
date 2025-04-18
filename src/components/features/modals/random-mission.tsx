'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import { CustomButton } from '@/components/ui/custom-button';
import { MAIN_CHARACTER_URL } from '@/constants/default-image-url';
import type { TableMissionList } from '@/types/supabase-const';
import MISSION_BACKGROUND from '@images/images/random-modal-bg.svg';

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
  missionsData: TableMissionList[];
  clickModal: Function;
  showModal: boolean;
  isLogin: boolean;
}

const TIME_OUT = 1250;
const RandomMissionModal = ({ missionsData, clickModal, showModal, isLogin }: RandomMissionModalProps) => {
  const [randomMission, setRandomMission] = useState<string>('');
  const [showContent, setShowContent] = useState(true);

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
    setShowContent(false);
  };

  const RandomMissionWithLoadingSpinner = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, TIME_OUT);

      return () => clearTimeout(timer);
    }, []);

    if (!showContent) {
      return (
        <div className="relative left-[37px] top-[25px] h-[94px] w-[94px]">
          <FadeLoader className="custom-spinner" />
        </div>
      );
    }

    return (
      <>
        <Image
          src={MISSION_BACKGROUND}
          alt="랜덤 미션 배경 효과"
          width={461}
          height={177}
          className="absolute"
          style={{ width: 'auto', height: 'auto' }}
        />
        <p className="justify-start text-center text-xl font-semibold leading-relaxed text-secondary-grey-900">
          {randomMission}
        </p>
      </>
    );
  };

  return (
    <div
      onClick={() => clickModal()} // 배경 클릭하면 모달 나가기
      className="fixed left-0 top-0 z-[51] flex h-full w-full items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 안을 클릭 했을 때 나가는 것 막음
        className="relative flex h-[416px] w-[598px] flex-col gap-5 overflow-hidden rounded-[20px] bg-white px-[68px] pb-[36px] pt-[60px]"
      >
        <X onClick={() => clickModal()} className="absolute right-[30px] top-[30px] z-[52] h-7 w-7 cursor-pointer" />
        <div className="flex flex-col justify-start gap-2.5 self-stretch text-center leading-relaxed text-secondary-grey-900">
          <strong className="text-xl font-semibold">오늘의 랜덤 미션</strong>
          <p className="text-base font-normal">
            {isLogin ? '두근두근 뭐가 나올까?' : '더 많은 미션을 원하시면 회원가입하세요!'}
          </p>
        </div>
        <div className="flex h-[178px] w-[462px] items-center justify-center">
          {randomMission ? (
            <RandomMissionWithLoadingSpinner />
          ) : (
            <Image
              src={MAIN_CHARACTER_URL}
              alt="랜덤 뽑기 캐릭터 이미지"
              width={104}
              height={142}
              style={{ height: '142px', width: '104px' }}
            />
          )}
        </div>
        {showContent && (
          <CustomButton onClick={handleRandomMission} type="button" className="mx-auto">
            {randomMission ? '다시 뽑기' : '뽑기'}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default RandomMissionModal;
