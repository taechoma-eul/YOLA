import { getRandomMissionData } from '@/lib/utils/api/mission-list.api';
import { useEffect, useState } from 'react';

/*
사용할 곳에서
const [showModal, setShowModal] = useState(false);
const clickModal = () => setShowModal(!showModal);
을 선언해주시고,
<button onClick={clickModal}>랜덤 미션 뽑기</button>
{showModal && <RandomMissionModal clickModal={clickModal} />}
을 통해 모달을 끌 수 있도록 setter 함수를 넘겨주면 사용할 수 있습니다
 */
const RandomMissionModal = ({ clickModal }: { clickModal: Function }) => {
  const [randomMission, setRandomMission] = useState('오늘의 랜덤 미션은?');

  useEffect(() => {
    handleRandomMission(); 
  }, []);

  const handleRandomMission = async () => {
    try {
      const randomMissionData = await getRandomMissionData();
      setRandomMission(randomMissionData.content);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      onClick={() => clickModal()} // 배경 클릭하면 모달 나가기
      className="fixed top-0 flex h-full w-full items-center justify-center bg-gray-500/50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 안을 클릭 했을 때 나가는 것 막음
        className="flex w-96 flex-col items-center justify-center rounded-2xl bg-slate-300 p-6"
      >
        {/**TODO - 루시드 설치 후 X 아이콘 삽입 */}
        <h1>오늘의 랜덤 미션</h1>
        <p>더 많은 미션을 원하시면 회원가입하세요!</p>
        {/**TODO - 로그인 여부에 따라 조건부 렌더링 */}
        <div className="flex flex-col items-center justify-center gap-2">{randomMission}</div>
        <div className="flex gap-8 pt-3">
          <button onClick={() => clickModal()}>닫기</button>
          <button type="button" onClick={() => handleRandomMission()}>
            다시 뽑기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomMissionModal;
