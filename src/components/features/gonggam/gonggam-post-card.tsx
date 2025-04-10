import Image from 'next/image';
import { DEFAULT_LIFE_IMAGE_URL } from '@/constants/default-image-url';
import { getPostImagesByPostId, getPostMetaByPostId, getWriterProfile } from '@/lib/utils/api/gonggam-board.api';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { Heart, MessageSquare } from 'lucide-react';
import type { GonggamPost } from '@/types/gonggam';

interface GonggamPostCardProps {
  post: GonggamPost;
}

const GonggamPostCard = async ({ post }: GonggamPostCardProps) => {
  /** 작성자 닉네임 불러오기 */
  const { nickname } = await getWriterProfile(post.user_id);

  /** 이미지 불러오기 */
  const images = await getPostImagesByPostId(post.id);
  const imagePreview = images[0] ?? DEFAULT_LIFE_IMAGE_URL;

  /** like, comments 불러오기 */
  const { likeCnt, commentCnt } = await getPostMetaByPostId(post.id);

  return (
    <li className="py-3">
      <article className="flex items-start justify-between">
        {/* 게시글 제목 / 내용 */}
        <section className="flex-1">
          <h3 className="text-base font-medium">{post.title}</h3>
          <p className="mt-0.5 text-sm text-gray-600">{post.content}</p>
        </section>

        {/* 게시글 정보 (작성자, 작성일, previewImage) */}
        <aside className="ml-3 flex items-center gap-3 text-center">
          <div className="space-y-0.5 text-center text-[11px] text-gray-400">
            <p>{nickname}</p>
            <time dateTime={post.created_at}>{formatRelativeDate(post.created_at)}</time>
          </div>

          <figure className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md">
            <Image src={imagePreview} alt={post.title} fill className="object-cover" />
          </figure>
        </aside>
      </article>

      {/* 좋아요 / 댓글 현황 */}
      <footer className="flex gap-3 text-[12px] text-gray-400">
        <div className="flex items-center gap-1">
          <Heart size={12} /> {likeCnt}
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare size={12} /> {commentCnt}
        </div>
      </footer>
    </li>
  );
};

export default GonggamPostCard;
