import { slugToCategory } from '@/constants/gonggam-category';
import { getGonggamPosts } from '@/lib/utils/api/gonggam-board.api';

interface GonggamCategoryBoardProps {
  params: { category: string };
}

const GonggamCategoryBoard = async ({ params: { category } }: GonggamCategoryBoardProps) => {
  const gonggamPosts = await getGonggamPosts(slugToCategory[category]);
  return <div>{category}탭의 콘텐츠입니다.</div>;
};

export default GonggamCategoryBoard;
