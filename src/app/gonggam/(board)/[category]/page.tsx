import { GonggamPagination } from '@/components/features/gonggam/gonggam-pagination';
import GonggamPostCard from '@/components/features/gonggam/gonggam-post-card';
import { slugToCategory } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';
import { getPaginatedGonggamPosts } from '@/lib/utils/api/gonggam-board.api';
import Link from 'next/link';
import Image from 'next/image';

interface GonggamCategoryBoardProps {
  params: { category: string };
  searchParams: { page?: string };
}

const GonggamCategoryBoard = async ({ params: { category }, searchParams }: GonggamCategoryBoardProps) => {
  const currentPage = Number(searchParams.page) || 1;
  const { posts, pagination } = await getPaginatedGonggamPosts(slugToCategory[category], currentPage);

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-gray-200">
        {posts.length === 0 ? (
          <li className="py-3 text-sm text-gray-500">게시글이 없습니다.</li>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`${PATH.GONGGAM}/${post.category}/${post.id}`}>
              <GonggamPostCard post={post} />
            </Link>
          ))
        )}
      </ul>
      <GonggamPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        baseHref={`${PATH.GONGGAM}/${category}`}
      />
    </div>
  );
};

export default GonggamCategoryBoard;
