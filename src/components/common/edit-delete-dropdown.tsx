import { useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DeleteConfirmModal from '@/components/features/modals/delete-confirm';
import Image from 'next/image';
import dropdown from '@images/images/post-dropdown.svg';

const SET_TIME_OUT = 150;

/**
 * 수정/삭제를 할 수 있는 드롭다운입니다
 * 삭제 시 '삭제하시겠습니까?' 모달까지 연결되어 있습니다
 * 수정 로직을 담은 함수와 삭제 로직을 담은 함수를 Props로 넣어주면 사용이 가능합니다
 */
const EditDeleteDropdown = ({ handleEdit, handleDelete }: { handleEdit: () => void; handleDelete: () => void }) => {
  const [isOpen, setIsopen] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePointerEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsopen(true);
  };

  const handlePointerLeave = () => {
    /** 아이콘과 버튼 사이의 갭 때문에 생기는 리렌더링(깜빡임) 방지하기 위한 디바운싱 */
    timeoutRef.current = setTimeout(() => {
      setIsopen(false);
    }, SET_TIME_OUT);
  };

  /** 메모리 누수 방지를 위한 클린업 함수 */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} className="inline-block">
      <DropdownMenu open={isOpen} modal={false}>
        {/** 직접 넘긴 컴포넌트를 중첩 없이 그대로 사용하기 위해 asChild 필요 */}
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Image src={dropdown} alt="수정/삭제를 담고 있는 드롭다운 메뉴" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="pointer-events-auto z-[52] flex !h-[95px] min-w-[88px] flex-col justify-center rounded-[12px] text-center">
          <DropdownMenuItem className="flex p-0">
            <button
              onClick={() => handleEdit()}
              className="text-md flex w-full justify-center px-[16px] py-[12px] text-center"
            >
              수정
            </button>
          </DropdownMenuItem>
          <hr className="w-full border-t border-gray-300 px-[10px]" />
          <DropdownMenuItem className="p-0">
            <button
              onClick={() => setShowModal(!showModal)}
              className="text-md flex w-full justify-center px-[16px] py-[12px] text-center"
            >
              삭제
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showModal && (
        <DeleteConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} />
      )}
    </div>
  );
};

export default EditDeleteDropdown;
