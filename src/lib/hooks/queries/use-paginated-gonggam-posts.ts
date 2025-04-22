import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPaginatedGonggamPostsByClient } from '@/lib/utils/api/gonggam/gonggam-board-client.api';
import { QUERY_KEY } from '@/constants/query-keys';
import type { EnumCategories } from '@/types/supabase-const';

export const usePaginatedGonggamPosts = (category: EnumCategories, page: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GONGGAM_POSTS, category, page],
    queryFn: () => getPaginatedGonggamPostsByClient(category, page),
    placeholderData: keepPreviousData
  });
};
