'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { QUERY_KEY } from '@/constants/query-keys';
import { useQueryClient } from '@tanstack/react-query';
import { SelectBox } from '@/components/features/mypage/my-gonggam-filter';
import MypageGonggamItem from '@/components/features/mypage/mypage-gonggam-item';
import useGetGonggamPostsInfiniteQuery from '@/lib/hooks/queries/use-get-gonggam-posts-infinite-query';
import type { SortBy } from '@/types/gonggam-posts';

const MyGonggamPostClient = ({ nickname }: { nickname: string }) => {
  const [sortBy, setSortBy] = useState<SortBy>('latest');
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY.GONGGAM_POSTS_INFINITE(sortBy)
    });
  }, [sortBy]);

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
  }, [inView]);

  if (isPending) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러 발생</div>;

  const allPosts = posts.pages.flatMap((page) => page.data);

  return (
    <div>
      <section className="mb-[35px] flex flex-row items-center justify-between">
        <strong className="text-xl">{nickname}님이 작성한 공감 게시글</strong>
        <SelectBox value={sortBy} onChange={(value) => setSortBy(value as typeof sortBy)} />
      </section>

      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
        {allPosts.length === 0 ? (
          <div className="col-span-full flex h-screen flex-col items-center justify-center whitespace-normal bg-slate-100 text-center text-gray-500">
            <p>앗 아직 기록이 없어요</p>
            <p>공감 게시판에서 글을 작성해보세요!</p>
          </div>
        ) : (
          <>
            {allPosts.map((item) => (
              <MypageGonggamItem key={item.id} post={item} />
            ))}

            <div className="col-span-full flex items-center justify-center py-4 text-sm text-slate-400">
              {hasNextPage ? (
                <div ref={ref}>{isFetchingNextPage && '불러오는 중...'}</div>
              ) : (
                '작성하신 라이프글을 전부 불러왔어요.'
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyGonggamPostClient;
