'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  dislikePost,
  getPostMetaClient,
  getUserLikedStatus,
  likePost
} from '@/lib/utils/api/gonggam-detail-client.api';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { useGonggamComments } from '@/lib/hooks/queries/use-gonggam-comments';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useUploadComment } from '@/lib/hooks/mutations/use-gonggam-mutation';
import { Input } from '@/components/ui/input';
import { MSG } from '@/constants/messages';
import { toastAlert } from '@/lib/utils/toast';
import clsx from 'clsx';
import type { Tables } from '@/types/supabase';

interface PostInteractionProps {
  postId: number;
  tags: string[];
  initProfile: Tables<'users'>;
}

const GonggamPostInteraction = ({ postId, tags, initProfile }: PostInteractionProps) => {
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [commentCnt, setCommentCnt] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikePending, setIsLikePending] = useState<boolean>(false);
  const { comments, isCommentsPending, commentsErr } = useGonggamComments(postId);
  const { profile, isProfilePending, profileFetchingError } = useUserProfile(initProfile);
  const [newComment, setNewComment] = useState<string>('');
  const { mutate: uploadComment, isPending: isUploading } = useUploadComment(postId);

  useEffect(() => {
    const fetchPostMeta = async () => {
      try {
        const { likeCnt, commentCnt } = await getPostMetaClient(postId);
        setLikeCnt(likeCnt);
        setCommentCnt(commentCnt);
      } catch (err) {
        console.error(MSG.FAIL_TO_GET_POST_META, err);
      }
    };
    const fetchLikeStatus = async () => {
      if (!initProfile.id) return;
      try {
        const liked = await getUserLikedStatus({ postId, userId: initProfile.id });
        setIsLiked(liked);
      } catch (err) {
        console.error('좋아요 상태 조회 실패:', err);
      }
    };
    fetchLikeStatus();
    fetchPostMeta();
  }, [postId, initProfile.id]);

  const handleLikeToggle = async () => {
    if (!initProfile.id) return;
    setIsLikePending(true);
    try {
      if (isLiked) {
        await dislikePost({ postId, userId: initProfile.id });
        setLikeCnt((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await likePost({ postId });
        setLikeCnt((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      toastAlert(MSG.FAIL_TO_UPDATE_LIKE, 'destructive');
      console.error(err);
    } finally {
      setIsLikePending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    uploadComment(newComment, {
      onSuccess: () => {
        toastAlert(MSG.SUCCESS_UPLOAD_COMMENT);
        setNewComment('');
      },
      onError: (err) => {
        toastAlert(MSG.FAIL_TO_UPLOAD_COMMENT);
        throw Error(err.message);
      }
    });
  };

  const err = commentsErr ?? profileFetchingError;
  if (err) throw new Error(err.message);
  if (isCommentsPending || isProfilePending) return null;

  return (
    <section>
      {/* 좋아요(하트) 버튼 */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={handleLikeToggle}
          disabled={isLikePending}
          className="flex items-center gap-2 rounded-md border border-gray-500 p-2 transition-colors hover:text-primary"
        >
          <Heart
            size={14}
            className={clsx('transition-colors', {
              'fill-red-500 text-red-500': isLiked,
              'text-gray-400': !isLiked
            })}
          />
          <span>{likeCnt}</span>
        </button>
      </div>
      {/* 태그 영역 */}
      <div className="mt-4">
        <ul className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
          {tags?.map((tag) => (
            <li key={tag} className="rounded-md border border-gray-300 bg-muted px-2 py-1 text-xs text-gray-600">
              # {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* 댓글 영역 */}
      <div className="mt-8">
        <h2 className="mb-4 text-base font-medium">댓글 {commentCnt}개</h2>

        {comments.map((comment) => (
          <div key={comment.id} className="mb-6 flex items-start gap-2 border-b pb-6 text-sm">
            {/* 프로필 이미지 */}
            <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={comment.writer.profileImage || DEFAULT_AVATAR_URL}
                alt={`${comment.writer.nickname}`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            {/* 닉네임, 시간, 텍스트 */}
            <div>
              <div className="flex items-center gap-1">
                <p className="font-mono">{comment.writer.nickname ?? '알 수 없음'}</p>
                <span className="text-xs text-gray-400">{formatRelativeDate(comment.created_at)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{comment.comment}</p>
            </div>
          </div>
        ))}

        {/* 댓글 입력창 */}
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full">
            <Image
              src={profile!.profile_image || DEFAULT_AVATAR_URL}
              alt={`${profile?.nickname}`}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <Input
            type="text"
            placeholder="댓글을 작성해보세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" disabled={isUploading}>
            등록하기
          </Button>
        </form>
      </div>
    </section>
  );
};

export default GonggamPostInteraction;
