'use client';

import { getViewCountByClient } from '@/lib/utils/api/gonggam-board-client.api';
import { Eye, Heart, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GonggamBoardMetaProps {
  likeCnt: number;
  commentCnt: number;
  postId: string;
}

const GonggamBoardMeta = ({ likeCnt, commentCnt, postId }: GonggamBoardMetaProps) => {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const cnt = await getViewCountByClient(postId);
        setViewCount(cnt);
      } catch (error) {
        console.error(error);
      }
    };
    fetchViewCount();
  }, [postId]);

  return (
    <footer className="mb-[11px] flex gap-[12px] self-stretch">
      <div className="flex items-center gap-[3px] overflow-hidden truncate text-[12px] font-normal leading-normal text-secondary-grey-900">
        <Heart size={12} /> {likeCnt}
      </div>
      <div className="flex items-center gap-[3px] overflow-hidden truncate text-[12px] font-normal leading-normal text-secondary-grey-900">
        <MessageSquare size={12} /> {commentCnt}
      </div>
      <div className="flex items-center gap-[3px] overflow-hidden truncate text-[12px] font-normal leading-normal text-secondary-grey-900">
        <Eye size={12} /> {viewCount}
      </div>
    </footer>
  );
};

export default GonggamBoardMeta;
