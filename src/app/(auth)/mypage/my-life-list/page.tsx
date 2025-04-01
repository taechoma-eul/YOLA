import Image from 'next/image';
import { fetchAllLifeList } from '@/lib/utils/api/my-life.api';
import LifePostCard from '@/components/ui/life-post-card';
import { LifePost } from '@/types/life-post';

const MyLifeListPage = async () => {
  //supabase 데이터 불러오기 (우선 라이프 전체 글 가져오기로 테스트)
  const lifePosts: LifePost[] = await fetchAllLifeList();
  console.log(lifePosts);

  return (
    <div>
      <strong>OOO♥️님의 혼자 라이프 기록</strong>
      <section className="flex gap-3">
        {lifePosts.map((post) => (
          <LifePostCard key={post.id} lifePost={post} />
        ))}
      </section>
    </div>
  );
};

export default MyLifeListPage;
