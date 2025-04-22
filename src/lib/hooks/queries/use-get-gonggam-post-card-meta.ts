import { useQuery } from '@tanstack/react-query';
import { getGonggamPostCardMeta } from '@/lib/utils/api/gonggam/gonggam-board-client.api';
import { QUERY_KEY } from '@/constants/query-keys';

export const useGetGonggamPostCardMeta = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GONGGAM_POST_CARD, postId],
    queryFn: () => getGonggamPostCardMeta(postId)
  });
};
