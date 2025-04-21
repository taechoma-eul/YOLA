'use client';

import { clsx } from 'clsx';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FAIL } from '@/constants/messages';
import {
  dislikePost,
  getLikeCountClient,
  getUserLikedStatus,
  likePost
} from '@/lib/utils/api/gonggam/gonggam-detail-client.api';
import { toastAlert } from '@/lib/utils/toast';

interface GonggamLikesProps {
  postId: number;
  userId?: string;
}

const GonggamLikes = ({ postId, userId }: GonggamLikesProps) => {
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikePending, setIsLikePending] = useState<boolean>(false);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const likeCnt = await getLikeCountClient(postId);
        setLikeCnt(likeCnt);
      } catch (err) {
        console.error(FAIL.FAIL_TO_GET_POST_META, err);
      }
    };
    fetchMeta();
    const fetchLikeStatus = async () => {
      if (!userId) return;
      try {
        const liked = await getUserLikedStatus({ postId, userId });
        setIsLiked(liked);
      } catch (err) {
        console.error(FAIL.FAIL_TO_GET_LIKES, err);
      }
    };
    fetchLikeStatus();
  }, [postId, userId]);

  const handleLikeToggle = async () => {
    if (!userId) {
      toastAlert(FAIL.NEED_LOGIN, 'destructive');
      return;
    }
    setIsLikePending(true);
    try {
      if (isLiked) {
        await dislikePost({ postId, userId });
        setLikeCnt((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await likePost({ postId });
        setLikeCnt((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      toastAlert(FAIL.FAIL_TO_UPDATE_LIKE, 'destructive');
      console.error(err);
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-base text-secondary-grey-800">
        <button
          onClick={handleLikeToggle}
          disabled={isLikePending}
          className="flex h-[38px] w-[54px] items-center gap-[10px] rounded-[8px] border border-secondary-grey-700 p-2 transition-colors hover:text-primary"
        >
          <Heart
            size={14}
            className={clsx('transition-colors', {
              'fill-red-500 text-red-500': isLiked,
              'text-secondary-grey-800': !isLiked
            })}
          />
          <span>{likeCnt}</span>
        </button>
      </div>
    </div>
  );
};

export default GonggamLikes;
