'use client';

import { Dot } from 'lucide-react';
import Image from 'next/image';
import GonggamBoardMeta from '@/components/features/gonggam/gonggam-board-meta';
import { useGetGonggamPostCardMeta } from '@/lib/hooks/queries/use-get-gonggam-post-card-meta';
import { formatRelativeDate } from '@/lib/utils/date-format';
import type { GonggamPostDetailResponse } from '@/types/gonggam';

interface GonggamPostCardProps {
  post: GonggamPostDetailResponse;
}

const GonggamPostCard = ({ post }: GonggamPostCardProps) => {
  const { data: meta, isPending, error } = useGetGonggamPostCardMeta(post.id);

  if (error) throw new Error(error.message);

  return (
    <article className="flex max-w-[1200px] items-start justify-between gap-[10px] border-b border-secondary-grey-200 px-[10px] py-[12px]">
      <section className="flex flex-col items-start gap-1 self-stretch">
        {/* 작성자 영역 */}
        <div className="mt-[11px] flex h-[17px] items-center gap-[4px] text-[12px] font-normal leading-[140%] text-secondary-grey-800">
          <p>{post.writer.nickname}</p>
          <Dot size={12} className="translate-y-[-2px]" />
          <time dateTime={post.created_at}>{formatRelativeDate(post.created_at)}</time>
        </div>

        {/* 텍스트 영역 */}
        <div className="mb-[13px] mt-[4px] flex flex-col items-start gap-1 self-stretch">
          <h1 className="line-clamp-1 flex-1 text-[14px] font-normal leading-[140%] text-secondary-grey-900">
            {post.title}
          </h1>
          <p className="line-clamp-1 text-[12px] font-normal leading-[140%] text-secondary-grey-900">
            {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
          </p>
        </div>

        {/* 좋아요/댓글/조회수 */}
        {isPending ? (
          <div className="h-[10px] w-[120px] animate-pulse rounded-md bg-primary/10" />
        ) : (
          <GonggamBoardMeta likeCnt={meta.likeCnt} commentCnt={meta.commentCnt} viewCount={meta.viewCount} />
        )}
      </section>

      {/* 이미지 */}
      <figure className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-[16px]">
        {isPending ? (
          <div className="h-full w-full animate-pulse bg-primary/10" />
        ) : (
          <Image src={meta.imagePreview} alt={post.title} fill sizes="110px" className="object-cover" priority />
        )}
      </figure>
    </article>
  );
};

export default GonggamPostCard;
