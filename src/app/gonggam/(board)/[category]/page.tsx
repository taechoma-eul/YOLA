import { slugToCategory } from '@/constants/gonggam-category';
import { getPaginatedGonggamPosts } from '@/lib/utils/api/gonggam-board.api';

interface GonggamCategoryBoardProps {
  params: { category: string };
}

const GonggamCategoryBoard = async ({ params: { category } }: GonggamCategoryBoardProps) => {
  const posts = await getPaginatedGonggamPosts(slugToCategory[category]);
  // console.log(posts);
  return <div>{category}탭의 콘텐츠입니다.</div>;
};

export default GonggamCategoryBoard;
