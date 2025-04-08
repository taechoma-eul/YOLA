'use client';

import type { SoloLifeCardType } from '@/types/life-post';
import Image from 'next/image';

const SoloLifeCard = ({ id, imageUrls, thumbnail, title, content, date, isMission, tags }: SoloLifeCardType) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
      {/* 이미지 영역 */}
      <div className="relative aspect-square bg-gray-200">
        {/* 이미지가 없을 경우 기본 이미지 사용 */}
        <Image src={thumbnail} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>

      {/* 본문 내용 */}
      <div className="flex flex-1 flex-col p-3 text-sm text-black">
        {/* 내용 */}
        <p className="mb-2 whitespace-pre-line text-[13px] leading-snug">{content}</p>

        {/* 해시태그 */}
        <div className="mb-2 mt-auto flex flex-wrap gap-1 text-[12px] text-blue-600">
          {tags.map((tag, idx) => (
            <span key={idx}>#{tag}</span>
          ))}
        </div>

        {/* 날짜 및 구분 */}
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <span>{date}</span>
          <div className="flex items-center gap-1">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${isMission ? 'bg-red-400' : 'bg-black'}`} />
            <span>{isMission ? '미션인증' : '하루일기'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloLifeCard;
