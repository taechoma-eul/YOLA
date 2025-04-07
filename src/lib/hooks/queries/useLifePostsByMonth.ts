// lib/hooks/queries/useLifePostsByMonth.ts
import { useQuery } from '@tanstack/react-query';
import type { LifePostWithImageUrls } from '@/types/life-post';
import { getLifePostsByMonth } from '@/lib/utils/api/life-api-client';

export const useLifePostsByMonth = (month: string) => {
  return useQuery<LifePostWithImageUrls[]>({
    queryKey: ['lifePosts', month],
    queryFn: () => getLifePostsByMonth(month)
  });
};
