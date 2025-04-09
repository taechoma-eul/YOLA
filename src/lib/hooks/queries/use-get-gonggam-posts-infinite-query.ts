import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getMyGonggamPostsAll } from '@/lib/utils/api/my-gonggam-client.api';
import { GetMyGonggamPostsResponse } from '@/types/gonggam-posts';
/**
 * @function useGetGonggamPostsInfiniteQuery
 * @returns - pageParams, pages 을 반환,
 */
const useGetGonggamPostsInfiniteQuery = () => {
  return useInfiniteQuery<GetMyGonggamPostsResponse>({
    queryKey: QUERY_KEY.GONGGAM_POSTS_INFINITE,
    queryFn: ({ pageParam }) => getMyGonggamPostsAll({ page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1
  });
};

export default useGetGonggamPostsInfiniteQuery;
