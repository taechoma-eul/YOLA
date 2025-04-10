'use client';

import { Button } from '@/components/ui/button';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const GonggamPostInteraction = ({ postId }: { postId: number }) => {
  return (
    <section>
      {/* 좋아요(하트) 버튼 */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <button className="flex items-center gap-2 rounded-md border border-gray-500 p-2 transition-colors hover:text-primary">
          <Heart size={14} />
          <span>10</span> {/* 좋아요 수 하드코딩 예시 */}
        </button>
      </div>
      {/* 태그 영역 */}
      <div className="mt-4">
        <div className="mb-6 flex flex-wrap gap-1 text-sm text-muted-foreground">
          <p className="rounded-md border px-2 py-1">#태그1</p>
          <p className="rounded-md border px-2 py-1">#태그2</p>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="mt-8">
        <h2 className="mb-4 text-base font-medium">댓글 1개</h2>

        {/* 댓글 목록 */}
        <div className="mb-6 flex items-start gap-2 border-b pb-6 text-sm">
          {/* 프로필 이미지 */}
          <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full">
            <Image src={DEFAULT_AVATAR_URL} alt={`댓글작성자의 프로필 이미지`} fill className="object-cover" />
          </div>

          {/* 닉네임, 시간, 댓글 텍스트 */}
          <div>
            <div className="flex items-center gap-1">
              <p className="font-mono">닉네ㅁ</p>
              <span className="text-xs text-gray-400">1일 전</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">우와, 너무 신기해요.</p>
          </div>
        </div>

        {/* 댓글 입력창 */}
        <form className="flex items-center gap-2">
          {/* TODO: 로그인 사용자의 프로필 이미지 */}
          <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full">
            <Image src={DEFAULT_AVATAR_URL} alt={`로그인유저의 프로필 이미지`} fill className="object-cover" />
          </div>
          <input
            type="text"
            placeholder="댓글을 작성해보세요."
            className="flex-1 rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit">등록하기</Button>
        </form>
      </div>
    </section>
  );
};

export default GonggamPostInteraction;
