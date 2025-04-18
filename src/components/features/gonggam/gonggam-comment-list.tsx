'use client';

import Image from 'next/image';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { useGonggamComments } from '@/lib/hooks/queries/use-gonggam-comments';
import { formatRelativeDate } from '@/lib/utils/date-format';

const GonggamCommentList = ({ postId }: { postId: number }) => {
  const { comments, isCommentsPending, commentsErr } = useGonggamComments(postId);

  if (commentsErr) throw new Error(commentsErr.message);
  if (isCommentsPending) return null;

  return (
    <div className="mb-[44px] mt-[24px]">
      <h2 className="mb-[14px] text-base font-medium">댓글 {comments.length}개</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-[16px] py-[12px] text-sm">
          {/* 프로필 이미지 */}
          <div className="border-black/12 relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full border">
            <Image
              src={comment.writer.profileImage || DEFAULT_AVATAR_URL}
              alt={`${comment.writer.nickname}`}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          {/* 닉네임, 시간, 텍스트 */}
          <div className="flex flex-col gap-[4px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-[16px] font-semibold leading-[1.4]">{comment.writer.nickname ?? '알 수 없음'}</p>
              <span className="text-[16px] font-normal text-secondary-grey-700">
                {formatRelativeDate(comment.created_at)}
              </span>
            </div>
            <p className="text-[16px] font-normal leading-[1.4]">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GonggamCommentList;
