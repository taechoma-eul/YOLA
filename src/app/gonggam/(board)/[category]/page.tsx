import { GonggamPagination } from '@/components/features/gonggam/gonggam-pagination';
import { slugToCategory } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';
import { getPaginatedGonggamPosts } from '@/lib/utils/api/gonggam-board.api';
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
            <li key={post.id} className="py-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-medium">{post.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-600">{post.content}</p>
                </div>

                <div className="ml-3 flex items-center gap-3 text-center">
                  <div className="space-y-0.5 text-center text-[11px] text-gray-400">
                    <p>작성자</p>
                    <p>{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center border text-[11px] text-gray-400">
                    이미지
                  </div>
                </div>
              </div>

              {/* 하단: 좋아요 / 댓글란 */}
              <div className="mt-1 text-[11px] text-gray-400">좋아요 / 댓글란</div>
            </li>
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
