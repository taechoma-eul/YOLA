import Image from 'next/image';
import { DEFAULT_LIFE_IMAGE_URL } from '@/constants/default-image-url';
import {
  getPostImagesByPostId,
  getPostMetaByPostId,
  getViewCount,
  getWriterProfile
} from '@/lib/utils/api/gonggam-board.api';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { Dot } from 'lucide-react';
import type { GonggamPost } from '@/types/gonggam';
import GonggamBoardMeta from '@/components/features/gonggam/gonggam-board-meta';

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
  const viewCount = await getViewCount(String(post.id));

  return (
    <article className="flex max-w-[1200px] items-start justify-between gap-[10px] border-b border-secondary-grey-200 px-[10px] py-[12px]">
      <section className="flex flex-col items-start gap-1 self-stretch">
        {/* 작성자 영역 */}
        <div className="mt-[11px] flex h-[17px] items-center gap-[4px] text-[12px] font-normal leading-[140%] text-secondary-grey-800">
          <p>{nickname}</p>
          <Dot size={12} className="translate-y-[-2px]" />
          <time dateTime={post.created_at}>{formatRelativeDate(post.created_at)}</time>
        </div>
        {/* 텍스트 영역 */}
        <div className="mb-[13px] mt-[4px] flex flex-col items-start gap-1 self-stretch">
          <h3 className="flex-1 text-[14px] font-normal leading-[140%] text-secondary-grey-900">{post.title}</h3>
          <p className="overflow-hidden truncate text-[12px] font-normal leading-[140%] text-secondary-grey-900">
            {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
          </p>
        </div>
        {/* 좋아요/댓글/조회수 */}
        <GonggamBoardMeta likeCnt={likeCnt} commentCnt={commentCnt} viewCount={viewCount} />
      </section>

      {/* 이미지 */}
      <figure className="relative h-[110px] w-[110px] overflow-hidden rounded-[16px]">
        <Image src={imagePreview} alt={post.title} fill sizes="110px" className="object-cover" priority />
      </figure>
    </article>
  );
};

export default GonggamPostCard;
