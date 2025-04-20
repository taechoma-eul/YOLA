'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SelectBox } from '@/components/features/mypage/my-gonggam-filter';
import MypageGonggamItem from '@/components/features/mypage/mypage-gonggam-item';
import { QUERY_KEY } from '@/constants/query-keys';
import useGetGonggamPostsInfiniteQuery from '@/lib/hooks/queries/use-get-gonggam-posts-infinite-query';
import type { SortBy } from '@/types/gonggam';

const MyGonggamPostClient = ({ nickname }: { nickname: string }) => {
  const [sortBy, setSortBy] = useState<SortBy>('latest');
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY.GONGGAM_POSTS_INFINITE(sortBy)
    });
  }, [sortBy, queryClient]);

  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetGonggamPostsInfiniteQuery(sortBy);

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) return <div className="p-4">로딩 중...</div>;
  if (error) throw error;

  const allPosts = posts.pages.flatMap((page) => page.data);

  return (
    <div className="mt-[72px]">
      <section className="mb-[35px] flex flex-row items-center justify-between">
        <div className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {nickname}님이 작성한 공감 게시글
        </div>
        <SelectBox value={sortBy} onChange={(value) => setSortBy(value as typeof sortBy)} />
      </section>

      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
        {allPosts.length === 0 ? (
          <div className="col-span-full mb-[272px] flex min-h-[542px] flex-col items-center justify-center whitespace-normal rounded-[12px] bg-secondary-grey-100 text-center text-secondary-grey-500">
            <p>앗 아직 기록이 없어요</p>
            <p>공감 게시판에서 글을 작성해보세요!</p>
          </div>
        ) : (
          <>
            {allPosts.map((item) => (
              <MypageGonggamItem key={item.id} post={item} />
            ))}

            <div className="col-span-full flex items-center justify-center text-sm text-secondary-grey-500">
              {hasNextPage ? (
                <div ref={ref}>{isFetchingNextPage && '불러오는 중...'}</div>
              ) : (
                '작성하신 공감 게시글을 전부 불러왔어요.'
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyGonggamPostClient;
