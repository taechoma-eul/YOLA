import SoloLifeCard from '@/components/features/life/solo-life-card';
import { useLifePostsByMonth } from '@/lib/hooks/queries/useLifePostsByMonth';
import type { SoloLifeCardType } from '@/types/life-post';

const SoloLifeList = ({ selectedDate }: { selectedDate: string }) => {
  const selectedMonth = selectedDate.slice(0, 7); // 'YYYY-MM'
  const { data: posts = [], isLoading, error } = useLifePostsByMonth(selectedMonth);

  const parsedList: SoloLifeCardType[] = posts
    .filter((p) => p.created_at.startsWith(selectedDate))
    .map((post) => {
      const imageUrls = post.image_urls ?? [];
      return {
        id: post.id.toString(),
        date: post.created_at.slice(0, 10),
        title: post.content.split('\n')[0] || '제목 없음',
        content: post.content,
        thumbnail:
          imageUrls[0] ||
          'https://rrrswimuyqumlnkrfsli.supabase.co/storage/v1/object/public/life-post-images//i16283854196.png',
        imageUrls,
        isMission: post.mission_id !== null
      };
    });

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러 발생</div>;

  return (
    <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {parsedList.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">이 날 작성된 혼자 라이프가 없어요.</div>
      ) : (
        parsedList.map((data) => <SoloLifeCard key={data.id} {...data} />)
      )}
    </div>
  );
};

export default SoloLifeList;
