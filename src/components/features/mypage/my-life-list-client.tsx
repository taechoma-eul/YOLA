'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SoloLifeCard from '@/components/common/solo-life-card';
import useGetLifePostsInfiniteQuery from '@/lib/hooks/queries/use-get-life-posts-infinite-query';
import type { GetLifePostsResponse, SoloLifeCardType } from '@/types/life-post';
import { DEFAULT_LIFE_IMAGE_URL } from '@/constants/default-image-url';

const MyLifeListClient = () => {
  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetLifePostsInfiniteQuery();

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const parsedList: SoloLifeCardType[] =
    posts?.pages?.flatMap((page: GetLifePostsResponse) =>
      page.data.map((post) => {
        const imageUrls = post.image_urls ?? [];
        return {
          id: post.id.toString(),
          date: post.date,
          title: post.title || post.content.split('\n')[0] || '제목 없음',
          content: post.content,
          thumbnail: imageUrls[0] || DEFAULT_LIFE_IMAGE_URL,
          imageUrls,
          isMission: post.mission_id !== null,
          tags: post.tags ?? []
        };
      })
    ) ?? [];

  if (isPending) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러 발생</div>;

  return (
    <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {parsedList.length === 0 ? (
        <div className="col-span-full flex h-screen flex-col items-center justify-center whitespace-normal bg-slate-100 text-center text-gray-500">
          <p>앗 아직 기록이 없어요</p>
          <p>오늘의 혼자 라이프를 기록해보세요!</p>
        </div>
      ) : (
        <>
          {parsedList.map((post) => (
            <SoloLifeCard key={post.id} {...post} />
          ))}

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

export default MyLifeListClient;
