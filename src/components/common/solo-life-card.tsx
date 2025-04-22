'use client';

import Image from 'next/image';
import type { SoloLifeCardType } from '@/types/life-post';

interface SoloLifeCardProps extends SoloLifeCardType {
  onClick: () => void;
}

const SoloLifeCard = ({ thumbnail, content, date, isMission, tags, onClick }: SoloLifeCardProps) => {
  const maxLength = 30;
  const previewContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  const formattedDate = date.replaceAll('-', '.');
  return (
    <article
      onClick={onClick}
      className="flex h-[340px] cursor-pointer flex-col rounded-2xl bg-white p-4 outline outline-1 outline-offset-[-1px] outline-secondary-grey-300"
    >
      {/* 이미지 영역 */}
      <figure className="h-52 w-full flex-shrink-0">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-orange-50">
          <Image src={thumbnail} alt="썸네일" width={208} height={208} className="object-cover" />
        </div>
      </figure>

      {/* 내용 + 태그 + footer */}
      <section className="mt-2 flex flex-1 flex-col justify-start">
        {/* 본문 */}
        <p className="mb-2 whitespace-pre-line break-words text-sm leading-tight text-secondary-grey-900">
          {previewContent}
        </p>

        {/* 태그 */}
        <ul className="mb-2 mt-auto flex flex-wrap gap-1">
          {tags.map((tag, idx) => (
            <li
              key={idx}
              className="rounded bg-secondary-grey-100 px-2 py-1 text-xs text-secondary-grey-900 outline outline-1 outline-offset-[-1px] outline-black/10"
            >
              #{tag}
            </li>
          ))}
        </ul>

        {/* footer (날짜 + 타입) */}
        <footer className="flex items-center gap-2 text-xs text-secondary-grey-800">
          <time>{formattedDate}</time>
          <div className="h-0 w-2.5 rotate-90 outline outline-1 outline-offset-[-0.52px] outline-secondary-grey-400" />
          <div className="flex items-center gap-1">
            <div className={`h-2 w-2 rounded-full ${isMission ? 'bg-rose-400' : 'bg-secondary-grey-900'}`} />
            <span>{isMission ? '미션인증' : '하루일기'}</span>
          </div>
        </footer>
      </section>
    </article>
  );
};

export default SoloLifeCard;
