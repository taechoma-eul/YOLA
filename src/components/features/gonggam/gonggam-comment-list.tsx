'use client';

import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { useGonggamComments } from '@/lib/hooks/queries/use-gonggam-comments';
import { formatRelativeDate } from '@/lib/utils/date-format';
import Image from 'next/image';

const GonggamCommentList = ({ postId }: { postId: number }) => {
  const { comments, isCommentsPending, commentsErr } = useGonggamComments(postId);

  if (commentsErr) throw new Error(commentsErr.message);
  if (isCommentsPending) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-base font-medium">댓글 {comments.length}개</h2>
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
    </div>
  );
};

export default GonggamCommentList;
