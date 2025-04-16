import { QUERY_KEY } from '@/constants/query-keys';
import { getCommentsByPostId } from '@/lib/utils/api/gonggam-detail-client.api';
import { useQuery } from '@tanstack/react-query';
import type { CommentWithUser } from '@/types/gonggam';

export const useGonggamComments = (postId: number) => {
  const {
    data: comments = [],
    isPending: isCommentsPending,
    error: commentsErr
  } = useQuery<CommentWithUser[]>({
    queryKey: QUERY_KEY.GONGGAM_COMMENTS(postId),
    queryFn: () => getCommentsByPostId(postId)
  });
  return { comments, isCommentsPending, commentsErr };
};
