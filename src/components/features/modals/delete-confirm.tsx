import { X } from 'lucide-react';
import ReactDOM from 'react-dom';

/**
 * Step 1. 모달을 호출할 파일에 이 코드를 추가해주세요
 * const [showModal, setShowModal] = useState(false);
 *
 * Step 2. 삭제버튼이 있는 부분에 이 코드를 넣어주세요
 *  onClick={() => setShowModal(!showModal)}
 *
 * Step 3. 버튼이 있는 코드 바깥에(맵을 돌리고 있다면 맵 바깥에) 이 코드를 추가해주세요
 * 삭제 대상이 댓글이라면 isItPost={false}를 넣어주세요
 * {showModal && <DeleteConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} />}
 */
const DeleteConfirmModal = ({
  clickModal,
  handleDelete,
  isItPost
}: {
  clickModal: () => void;
  handleDelete: () => void;
  isItPost: boolean;
}) => {
  const modal = (
    <div
      onClick={clickModal} // 배경 클릭하면 모달 나가기
      className="fixed inset-0 z-[60] flex min-h-screen items-center justify-center bg-gray-500/50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 안을 클릭 했을 때 나가는 것 막음
        className="relative w-96 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <X onClick={clickModal} className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black" />
        <h1>{isItPost ? `글` : `댓글`}을 삭제합니다.</h1>
        <p>정말 삭제하시겠습니까?</p>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );

  // 부모 모달에 영향 받지 않고 최상위에 띄워줌
  return ReactDOM.createPortal(modal, document.body);
};

export default DeleteConfirmModal;
