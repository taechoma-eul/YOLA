import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getGonggamPostCardMeta } from '@/lib/utils/api/gonggam/gonggam-board-client.api';

export const useGetGonggamPostCardMeta = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GONGGAM_POST_CARD, postId],
    queryFn: () => getGonggamPostCardMeta(postId)
  });
};
