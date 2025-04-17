'use client';

import { useViewCount } from '@/lib/hooks/use-view-count';
import { Eye } from 'lucide-react';

interface GonggamDetailViewCountProps {
  postId: string;
  initCount: number;
}

const GonggamDetailViewCount = ({ postId, initCount }: GonggamDetailViewCountProps) => {
  const viewCount = useViewCount(postId, initCount);
  return (
    <div className="text-secondary-gray-800 flex items-center gap-[3px] text-[16px] font-normal leading-[1.4]">
      <Eye size={14} />
      {viewCount}
    </div>
  );
};

export default GonggamDetailViewCount;
