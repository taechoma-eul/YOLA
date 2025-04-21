'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import GonggamPagination from '@/components/features/gonggam/gonggam-pagination';
import GonggamPostCard from '@/components/features/gonggam/gonggam-post-card';
import { usePaginatedGonggamPosts } from '@/lib/hooks/queries/use-paginated-gonggam-posts';
import { slugToCategory } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';

interface GonggamCategoryBoardProps {
  params: { category: string };
}

const GonggamCategoryBoard = ({ params: { category } }: GonggamCategoryBoardProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const categoryEnum = slugToCategory[category];
  const { data, isPending, error } = usePaginatedGonggamPosts(categoryEnum, currentPage);

  if (isPending) return <div className="p-4">loading...</div>;
  if (error) throw new Error(error.message);

  const { posts, pagination } = data;

  return (
    <div>
      <ul className="mb-[2px]">
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
