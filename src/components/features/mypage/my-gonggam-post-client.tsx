'use client';

import useGetGonggamPostsInfiniteQuery from '@/lib/hooks/queries/use-get-gonggam-posts-infinite-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import GonggamItem from '../home/main-gonggam-item';

const MyGonggamPostClient = () => {
  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetGonggamPostsInfiniteQuery();

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isPending) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러 발생</div>;

  console.log(posts);

  return (
    <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
      {posts.pages.flatMap((page) => page.data).length === 0 ? (
        <div className="col-span-full flex h-screen flex-col items-center justify-center whitespace-normal bg-slate-100 text-center text-gray-500">
          <p>앗 아직 기록이 없어요</p>
          <p>공감 게시판에서 글을 작성해보세요!</p>
        </div>
      ) : (
        <>
          {posts.pages.flatMap((page) => page.data.map((item) => <GonggamItem key={item.id} post={item} />))}

          {/* 무한 스크롤 로딩 및 종료 메세지 */}
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
  );
};

export default MyGonggamPostClient;
