// src/lib/hooks/queries/use-life-posts-by-month-range.ts

import { useQueries } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getLifePostsByMonth } from '@/lib/utils/api/life-api-client';
import type { LifePostWithImageUrls } from '@/types/life-post';

export const useLifePostsByMonthRange = (months: string[]) => {
  const results = useQueries({
    queries: months.map((month) => ({
      queryKey: [QUERY_KEY.LIFE_POSTS, month],
      queryFn: () => getLifePostsByMonth(month)
    }))
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const data: LifePostWithImageUrls[] = results.filter((r) => r.status === 'success').flatMap((r) => r.data ?? []);

  return { data, isLoading, isError };
};
