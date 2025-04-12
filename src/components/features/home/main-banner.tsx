import Image from 'next/image';
import clsx from 'clsx';
import type { Banner } from '@/types/components/main-banner';
import { MAIN_CHARACTER_URL } from '@/constants/default-image-url';

const MainBanner = ({ title, text, color }: Banner) => {
  return (
    <div
      className={clsx(
        'relative h-60 w-[1280px] overflow-hidden',
        color === 'orange' && 'bg-amber-300',
        color === 'blue' && 'bg-[#D8EFF7]',
        color === 'red' && 'bg-[#FFBFA9]'
      )}
    >
      <div className="absolute left-[40px] top-[135px] inline-flex w-[455px] flex-col items-start justify-start gap-2.5">
        <strong className="justify-start self-stretch text-3xl font-bold text-neutral-800">{title}</strong>
        <p className="justify-start self-stretch text-base font-normal leading-snug text-neutral-800">{text}</p>
      </div>
      <div className="absolute left-[1001px] top-[48px] h-44 w-32 overflow-hidden">
        <Image priority src={MAIN_CHARACTER_URL} alt="메인 배너 캐릭터" width={124} height={167.96} />
      </div>
    </div>
  );
};

export default MainBanner;
