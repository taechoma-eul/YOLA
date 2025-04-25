'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import type { SoloLifeCardType } from '@/types/life-post';

interface SoloLifeCardProps extends SoloLifeCardType {
  mode?: 'mypage' | 'calendar'; // 옵셔널 처리
  onClick: () => void;
}

const SoloLifeCard = ({
  thumbnail,
  content,
  date,
  isMission,
  tags,
  onClick,
  mode = 'calendar' // 기본값 설정
}: SoloLifeCardProps) => {
  const maxLength = mode === 'mypage' ? 28 : 30;
  const previewContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  const formattedDate = date.replaceAll('-', '.');

  return (
    <article
      onClick={onClick}
      className={clsx(
        'flex w-full cursor-pointer items-start gap-3 rounded-2xl bg-white outline outline-1 outline-offset-[-1px] outline-secondary-grey-300',
        mode === 'mypage' && 'p-3 sm:h-[322px] sm:w-[222px] sm:flex-col',
        mode === 'calendar' && 'p-4 sm:h-[337px] sm:w-[237px] sm:flex-col'
      )}
    >
      {/* 이미지 (좌측 or 상단) */}
      <figure className="flex-shrink-0">
        <div
          className={clsx(
            'relative h-[66px] w-[66px] overflow-hidden',
            mode === 'mypage' && 'sm:h-[198px] sm:w-[198px]',
            mode === 'calendar' && 'sm:h-[205px] sm:w-[205px]',
            // 기본 사이즈 (모바일)
            'rounded-xl'
          )}
        >
          <Image src={thumbnail} alt="썸네일" fill sizes="205" className="object-cover" priority />
        </div>
      </figure>

      {/* 콘텐츠 */}
      <section className="flex h-full flex-1 flex-col justify-between sm:items-start">
        {/* 본문 */}
        <p className="line-clamp-1 text-sm font-medium text-secondary-grey-900 sm:line-clamp-none sm:whitespace-pre-line sm:break-words">
          {previewContent}
        </p>

        {/* 태그 */}
        <ul className="mt-1 flex flex-wrap gap-1 text-xs text-secondary-grey-900">
          {tags.map((tag, idx) => (
            <li
              key={idx}
              className="rounded bg-secondary-grey-100 px-2 py-1 outline outline-1 outline-offset-[-1px] outline-black/10"
            >
              # {tag}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <footer className="mt-1 flex items-center gap-[6px] text-xs text-secondary-grey-800">
          <time>{formattedDate}</time>
          <div className="mt-[1.7px] h-0 w-[9px] rotate-90 outline outline-[0.5px] outline-secondary-grey-400" />
          <div
            className={clsx(
              `h-[8px] w-[8px] rounded-full`,
              isMission ? 'bg-calendar-mission' : 'bg-secondary-grey-900'
            )}
          ></div>
          <span>{isMission ? '미션인증' : '하루일기'}</span>
        </footer>
      </section>
    </article>
  );
};

export default SoloLifeCard;
