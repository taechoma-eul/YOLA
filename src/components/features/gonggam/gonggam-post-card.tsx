'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dot } from 'lucide-react';
import GonggamBoardMeta from '@/components/features/gonggam/gonggam-board-meta';
import {
  getPostImagesByPostIdByClient,
  getPostMetaByPostIdByClient,
  getViewCountByClient
} from '@/lib/utils/api/gonggam/gonggam-board-client.api';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { DEFAULT_LIFE_IMAGE_URL } from '@/constants/default-image-url';
import { FAIL } from '@/constants/messages';
import type { GonggamPostDetailResponse } from '@/types/gonggam';

interface GonggamPostCardProps {
  post: GonggamPostDetailResponse;
}

const GonggamPostCard = ({ post }: GonggamPostCardProps) => {
  const [imagePreview, setImagePreview] = useState(DEFAULT_LIFE_IMAGE_URL);
  const [postMeta, setPostMeta] = useState({ likeCnt: 0, commentCnt: 0, viewCount: 0 });

  useEffect(() => {
    const fetchPostMeta = async () => {
      try {
        // 1. 이미지 불러오기
        const images = await getPostImagesByPostIdByClient(post.id);
        const fetchedImagePreview = images[0] ?? DEFAULT_LIFE_IMAGE_URL;
        setImagePreview(fetchedImagePreview);

        // 2. 좋아요, 댓글 수 불러오기
        const { likeCnt, commentCnt } = await getPostMetaByPostIdByClient(post.id);

        // 3. 조회수 불러오기
        const viewCount = await getViewCountByClient(String(post.id));

        setPostMeta({
          likeCnt,
          commentCnt,
          viewCount
        });
      } catch {
        throw new Error(FAIL.GET_POST_META);
      }
    };

    fetchPostMeta();
  }, [post.id]);

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
          <h1 className="flex-1 text-[14px] font-normal leading-[140%] text-secondary-grey-900">{post.title}</h1>
          <p className="overflow-hidden truncate text-[12px] font-normal leading-[140%] text-secondary-grey-900">
            {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
          </p>
        </div>

        {/* 좋아요/댓글/조회수 */}
        <GonggamBoardMeta likeCnt={postMeta.likeCnt} commentCnt={postMeta.commentCnt} viewCount={postMeta.viewCount} />
      </section>

      {/* 이미지 */}
      <figure className="relative h-[110px] w-[110px] overflow-hidden rounded-[16px]">
        <Image src={imagePreview} alt={post.title} fill sizes="110px" className="object-cover" priority />
      </figure>
    </article>
  );
};

export default GonggamPostCard;
