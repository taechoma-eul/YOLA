'use client';

import type { SoloLifeCardType } from '@/types/life-post';
import Image from 'next/image';

const SoloLifeCard = ({ img, title, content, date, isMission }: SoloLifeCardType) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded border border-gray-300 bg-white text-left text-sm shadow-sm">
      {/* 이미지 */}
      <div className="aspect-square bg-gray-200">
        <Image src={img} alt={title} className="h-full w-full object-cover" width={200} height={200} />
      </div>

      {/* 본문 영역 (flex 컬럼) */}
      <div className="flex flex-1 flex-col p-2">
        {/* 본문 텍스트 */}
        <div className="mb-1 whitespace-pre-line text-[13px] leading-snug text-black">{content}</div>

        {/* 해시태그 */}
        <div className="mb-2 mt-auto space-x-2 text-[12px] text-gray-700">
          {title.split(' ').map((tag, idx) => (
            <span key={idx} className="text-blue-600">
              #{tag}
            </span>
          ))}
        </div>

        {/* ⬇ 항상 아래에 위치 */}
        <div className="flex gap-2 text-[11px] text-gray-500">
          {date}
          {isMission ? (
            <div className="flex items-center space-x-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>미션인증</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
              <span>하루일기</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoloLifeCard;
