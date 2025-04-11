// lib/hooks/queries/useLifePostsByMonth.ts
import { useQuery } from '@tanstack/react-query';
import type { LifePostWithImageUrls } from '@/types/life-post';
import { getLifePostsByMonth } from '@/lib/utils/api/life-api-client';
import { QUERY_KEY } from '@/constants/query-keys';

export const useLifePostsByMonth = (month: string) => {
  return useQuery<LifePostWithImageUrls[]>({
    queryKey: QUERY_KEY.LIFE_POSTS(month),
    queryFn: () => getLifePostsByMonth(month)
  });
};
