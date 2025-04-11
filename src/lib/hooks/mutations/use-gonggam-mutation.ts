import { QUERY_KEY } from '@/constants/query-keys';
import { uploadGonggamComment } from '@/lib/utils/api/gonggam-detail-client.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => uploadGonggamComment({ postId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.GONGGAM_COMMENTS(postId) });
    }
  });
};
