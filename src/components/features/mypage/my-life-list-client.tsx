'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import NoRecordsBox from '@/components/common/no-records-box';
import SoloLifeCard from '@/components/common/solo-life-card';
import { PostDetailModal } from '@/components/features/modals/calendar-post-detail';
import { SelectBox } from '@/components/features/mypage/my-life-filter';
import { DEFAULT_LIFE_IMAGE_URL } from '@/constants/default-image-url';
import { QUERY_KEY } from '@/constants/query-keys';
import useGetLifePostsInfiniteQuery from '@/lib/hooks/queries/use-get-life-posts-infinite-query';
import type { GetLifePostsResponse, LifePostWithImageUrls, SoloLifeCardType, SortBy } from '@/types/life-post';

interface MyLifeListClientProps {
  nickname: string;
}

const MyLifeListClient = ({ nickname }: MyLifeListClientProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<LifePostWithImageUrls | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>('all');
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.LIFE_POSTS_INFINITE, sortBy]
    });
  }, [sortBy, queryClient]);

  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetLifePostsInfiniteQuery(sortBy);

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

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
  if (error) throw error;

  const handleClickCard = (id: string) => {
    //posts가 InfiniteData로 되어 있어 flatMap 사용
    const flatPosts = posts.pages.flatMap((page) => page.data) ?? [];
    const post = flatPosts.find((post: LifePostWithImageUrls) => post.id === +id);
    if (!post) {
      return;
    }
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <article className="mt-[20px] px-[16px] md:mt-[72px]">
      <section className="mb-[12px] flex flex-row items-center justify-between md:mb-[35px]">
        {/* 데스크탑에서만 보이는 텍스트 */}
        <h2 className="hidden justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900 md:block">
          {nickname}님의 혼자 라이프 기록
        </h2>
        {/* SelectBox는 항상 오른쪽 정렬 */}
        <div className="ml-auto">
          <SelectBox value={sortBy} onChange={(value) => setSortBy(value as typeof sortBy)} />
        </div>
      </section>

      <section className="flex flex-wrap gap-[18px]">
        {parsedList.length === 0 ? (
          <NoRecordsBox mode="라이프" />
        ) : (
          <>
            {parsedList.map((post) => (
              <SoloLifeCard {...post} key={post.id} onClick={() => handleClickCard(post.id)} mode="mypage" />
            ))}
            {showModal && (
              <PostDetailModal clickModal={() => setShowModal(false)} showModal={showModal} post={selectedPost} />
            )}
          </>
        )}
      </section>
      {/* 무한 스크롤 로딩 및 종료 메세지 */}
      <div className="col-span-full flex items-center justify-center py-4 text-sm text-slate-400">
        {hasNextPage ? (
          <div ref={ref}>{isFetchingNextPage && '불러오는 중...'}</div>
        ) : (
          '작성하신 라이프글을 전부 불러왔어요.'
        )}
      </div>
    </article>
  );
};

export default MyLifeListClient;
