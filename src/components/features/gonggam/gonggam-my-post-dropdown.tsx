'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

const GonggamMyPostDropdown = () => {
  const handleEdit = () => {
    // TODO: 수정 로직
    alert('수정');
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
