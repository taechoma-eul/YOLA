import { getAllLifePostsById } from '@/lib/utils/api/my-life.api';
import LifePostCard from '@/components/common/life-post-card';
import type { LifePost } from '@/types/life-post';

const MyLifeListPage = async () => {
  // 해당 User의 작성 게시글 전체 조회 (기본 최신순 _ 추후 페이지네이션 or 무한스크롤 작업 예정)
  const myAllLifePosts = await getAllLifePostsById();

  return (
    <div>
      <strong>OOO♥️님의 혼자 라이프 기록</strong>
      <section className="grid items-center justify-center gap-3 md:grid-cols-2 lg:grid-cols-4">
        {myAllLifePosts.map((post) => (
          <LifePostCard key={post.id} lifePost={post} />
        ))}
      </section>
    </div>
  );
};

export default MyLifeListPage;
