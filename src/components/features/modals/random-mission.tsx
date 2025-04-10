import { useState } from 'react';
import { X } from 'lucide-react';
import { useMissions } from '@/lib/hooks/queries/use-missions';

/*
사용할 곳에서
const [showModal, setShowModal] = useState(false);
const clickModal = () => setShowModal(!showModal);
을 선언해주시고,
<button onClick={clickModal}>랜덤 미션 뽑기</button>
{showModal && <RandomMissionModal clickModal={clickModal} isLogin={isLogin} />}
을 통해 모달을 끌 수 있도록 setter 함수와 로그인 여부를 알려주는 isLogin을 넘겨주면 사용할 수 있습니다
 */
const RandomMissionModal = ({ clickModal, isLogin }: { clickModal: Function; isLogin: boolean }) => {
  const [randomMission, setRandomMission] = useState<string>('');

  const { data: missionsData, isPending, isError } = useMissions();

  if (isPending) {
    return <div>...불러오는 중</div>;
  }
  if (isError) {
    return <div>문제가 생겼어요!</div>;
  }
  const handleRandomMission = () => {
    const randomIndex = Math.floor(Math.random() * missionsData.length);
    const randomMissionData = missionsData[randomIndex];
    setRandomMission(randomMissionData.content);
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
            {/**TODO - 사진 / 로딩 스피너 삽입 */}
          </div>
          <div className="relative h-44 w-[462px] rounded-xl">
            {randomMission ? (
              <div className="flex flex-col items-center justify-center gap-2">{randomMission}</div>
            ) : (
              <div className="absolute left-0 top-0 h-44 w-[462px] rounded-2xl bg-gray-200" />
            )}
          </div>
          <div
            data-priority="Primary"
            data-size="Medium"
            data-status="Default"
            className="pointer-cursor inline-flex w-56 items-center justify-center gap-2.5 rounded-xl bg-amber-300 px-4 py-2.5"
            onClick={() => handleRandomMission()}
          >
            <button
              type="button"
              className="justify-start font-['Pretendard'] text-base font-semibold leading-snug text-zinc-800"
            >
              뽑기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMissionModal;
