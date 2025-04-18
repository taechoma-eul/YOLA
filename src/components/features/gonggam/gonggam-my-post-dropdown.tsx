'use client';

import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/page-path';

const GonggamMyPostDropdown = ({ postId }: { postId: number }) => {
  const route = useRouter();
  const handleEdit = () => {
    route.push(`${PATH.GONGGAM_POST}/edit/${postId}`);
  };

  const handleDelete = () => {
    // TODO: 삭제 로직
    alert('삭제');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-sm p-1 hover:bg-muted">
          <MoreVertical size={14} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={handleEdit}>수정</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GonggamMyPostDropdown;
