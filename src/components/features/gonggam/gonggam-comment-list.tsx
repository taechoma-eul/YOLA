'use client';

import Image from 'next/image';
import DeleteConfirmModal from '@/components/features/modals/delete-confirm';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGonggamComments } from '@/lib/hooks/queries/use-gonggam-comments';
import { useDeleteGonggamComment } from '@/lib/hooks/mutations/use-delete-gonggam-comment';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { toastAlert } from '@/lib/utils/toast';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { QUERY_KEY } from '@/constants/query-keys';
import { FAIL, SUCCESS } from '@/constants/messages';

interface GonggamCommentListProps {
  postId: number;
  userId?: string;
}

const GonggamCommentList = ({ postId, userId }: GonggamCommentListProps) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);
  const { comments, isCommentsPending, commentsErr } = useGonggamComments(postId);
  const { mutate: deleteComment } = useDeleteGonggamComment();

  const handleDeleteComment = (commentId: number) => {
    if (targetCommentId === null) return;
    deleteComment(commentId, {
      onSuccess: () => {
        setShowModal(false);
        setTargetCommentId(null);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GONGGAM_COMMENTS, postId]
        });
        toastAlert(SUCCESS.DELETE_COMMENT);
      },
      onError: () => {
        toastAlert(FAIL.FAIL_TO_DELETE_COMMENT, 'destructive');
      }
    });
  };

  if (commentsErr) throw new Error(commentsErr.message);
  if (isCommentsPending) return null;

  return (
    <div className="mb-[44px] mt-[24px]">
      <h2 className="mb-[14px] text-base font-medium">댓글 {comments.length}개</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="relative flex items-start gap-[16px] py-[12px] text-sm">
          {/* 프로필 이미지 */}
          <div className="border-black/12 relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full border">
            <Image
              src={comment.writer.profileImage || DEFAULT_AVATAR_URL}
              alt={comment.writer.nickname ?? '알 수 없음'}
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

          {/* 수정/삭제 버튼 */}
          {comment.writer.id === userId && (
            <div className="absolute right-0 top-0 flex gap-1 text-sm text-secondary-grey-700">
              <button type="button" onClick={() => console.log('수정 클릭', comment.id)} className="hover:underline">
                수정
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => {
                  setShowModal(true);
                  setTargetCommentId(comment.id);
                }}
                className="hover:underline"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      ))}
      {showModal && (
        <DeleteConfirmModal
          clickModal={() => {
            setShowModal(false);
            setTargetCommentId(null);
          }}
          handleDelete={() => targetCommentId !== null && handleDeleteComment(targetCommentId)}
          isItPost={false}
        />
      )}
    </div>
  );
};

export default GonggamCommentList;
