import { useEffect, useState } from 'react';

export const PostDetailModal = ({
  clickModal,
  postId,
  showModal
}: {
  clickModal: Function;
  postId: string;
  showModal: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [showModal]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clickModal(false);
    }, 300);
  };

  return (
    <div
      onClick={() => handleClose()}
      className={`fixed inset-0 z-[51] bg-black/50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
        className={`fixed right-0 top-0 h-screen w-2/3 transform overflow-auto bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button onClick={() => handleClose()}>닫기</button>
          <p>모달입니다</p>
        </div>
      </div>
    </div>
  );
};
