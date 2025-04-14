import { AnimatePresence, motion } from 'framer-motion';
import SoloLifeCard from '@/components/common/solo-life-card';
import { useLifePostsByMonth } from '@/lib/hooks/queries/use-life-posts-by-month';
import type { SoloLifeCardType } from '@/types/life-post';

const SoloLifeList = ({ selectedDate }: { selectedDate: string }) => {
  const selectedMonth = selectedDate.slice(0, 7);
  const { data: posts = [], isLoading, error } = useLifePostsByMonth(selectedMonth);

  const parsedList: SoloLifeCardType[] = posts
    .filter((p) => p.date.startsWith(selectedDate))
    .map((post) => {
      const imageUrls = post.image_urls ?? [];
      return {
        id: post.id.toString(),
        date: post.date,
        title: post.content.split('\n')[0] || '제목 없음',
        content: post.content,
        thumbnail: imageUrls[0] || '/images/default-image.svg',
        imageUrls,
        isMission: post.mission_id !== null,
        tags: post.tags ?? []
      };
    });

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">에러 발생</div>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedDate} // 날짜 바뀔 때마다 새로 렌더링
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {parsedList.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">이 날 작성된 혼자 라이프가 없어요.</div>
        ) : (
          parsedList.map((data) => <SoloLifeCard key={data.id} {...data} />)
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SoloLifeList;
