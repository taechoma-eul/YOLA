import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PATH } from '@/constants/page-path';
import defaultImg from '@images/images/yola-default-img.png';

/*
사용할 곳에서
const [showModal, setShowModal] = useState(false);
const clickModal = () => setShowModal(!showModal);
을 선언해주시고,
<button onClick={clickModal}>checklist</button>
{showModal && <MissionModal clickModal={clickModal} type={type} />}
을 통해 모달을 끌 수 있도록 setter 함수와, 체크리스트의 타입을 넘겨주면 사용할 수 있습니다
 */
const MissionModal = ({ clickModal, type }: { clickModal: Function; type: string }) => {
  const router = useRouter();

  const handleStart = () => {
    router.push(`${PATH.CHECKLIST}`); //TODO 추후 로그인 여부에 따라 체크리스트/로그인 페이지로 이동
    clickModal();
  };

  // 체크리스트 타입에 따라 달라지는 내용
  const renderByType = () => {
    switch (type) {
      case '혼밥':
        return (
          <>
            <h2>혼밥 라이프 달성하기</h2>
            <Image src={defaultImg} alt="default image" />
            <p>혼자 어디까지 먹어봤니?</p>
            <p>혼밥 만랩 도전!</p>
          </>
        );
      case '혼여':
        return (
          <>
            <h2>혼여 라이프 달성하기</h2>
            <Image src={defaultImg} alt="default image" />
            <p>혼자 어디까지 가봤니?</p>
            <p>혼여 만랩 도전!</p>
          </>
        );
      case '청소':
        return (
          <>
            <h2>청결한 라이프 달성하기</h2>
            <Image src={defaultImg} alt="default image" />
            <p>혼자 어디까지 청소해봤니?</p>
            <p>청결 만랩 도전!</p>
          </>
        );
      case '갓생':
        return (
          <>
            <h2>갓생 라이프 달성하기</h2>
            <Image src={defaultImg} alt="default image" />
            <p>얼마나 갓생으로 살아봤니?</p>
            <p>갓생 만랩 도전!</p>
          </>
        );
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
        <div className="flex flex-col items-center justify-center gap-2">{renderByType()}</div>
        <div className="flex gap-8 pt-3">
          <button onClick={handleStart}>시작하기</button>
          <button onClick={() => clickModal()}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
