import Image from 'next/image';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/features/modals/confirm-modal';
import dropdown from '@images/images/post-dropdown.svg';

/**
 * 수정/삭제를 할 수 있는 드롭다운입니다
 * 삭제 시 '삭제하시겠습니까?' 모달까지 연결되어 있습니다
 * 수정 로직을 담은 함수와 삭제 로직을 담은 함수를 Props로 넣어주면 사용이 가능합니다
 */
const EditDeleteDropdown = ({ handleEdit, handleDelete }: { handleEdit: () => void; handleDelete: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePointerEnter = () => {
    if (showModal) return; // 화면 밖을 나갔다가 들어와도 드롭다운 생기지 않게 함
    setShowDropdown(true);
  };

  const handlePointerLeave = () => {
    if (showModal) return;
    setShowDropdown(false);
  };

  useEffect(() => {
    if (showModal) {
      setShowDropdown(false); // 모달 열릴 때 드롭다운 닫기
    }
  }, [showModal]);

  return (
    <div onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} className="relative w-fit">
      <button className="flex w-[88px] cursor-pointer items-center justify-end">
        <Image src={dropdown} alt="수정/삭제 드롭다운 아이콘" />
      </button>

      {/* hover 유지용 투명 영역 (아이콘과 드롭다운 사이 끊김 방지) */}
      <div className="h-[14px] w-[88px] cursor-pointer" />

      {/* 드롭다운 메뉴 */}
      {showDropdown && (
        <div className="absolute left-0 top-full z-20 flex w-[88px] flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-0 shadow-[0_0_3px_0_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-secondary-grey-300">
          <button
            onClick={handleEdit}
            className="text-md flex w-full cursor-pointer justify-center px-[16px] py-[12px] text-center"
          >
            수정
          </button>
          <hr className="border-spacing-4 border-gray-300 px-[35px]" />
          <button
            onClick={() => setShowModal(true)}
            className="text-md flex w-full cursor-pointer justify-center px-[16px] py-[12px] text-center"
          >
            삭제
          </button>
        </div>
      )}

      {showModal && <ConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} />}
    </div>
  );
};

export default EditDeleteDropdown;
