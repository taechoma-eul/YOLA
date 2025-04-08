import { EllipsisVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const SET_TIME_OUT = 150;

const EditDeleteDropdown = ({ handleEdit, handleDelete }: { handleEdit: Function; handleDelete: Function }) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} className="inline-block">
      <DropdownMenu open={isOpen} onOpenChange={setIsopen} modal={false}>
        {/** 직접 넘긴 컴포넌트를 중첩 없이 그대로 사용하기 위해 asChild 필요 */}
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            {/** 아이콘 */}
            <EllipsisVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="pointer-events-auto z-[52]">
          <div className="flex w-10 flex-col">
            <button onClick={() => handleEdit()}>수정</button>
            <button onClick={() => handleDelete()}>삭제</button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditDeleteDropdown;
