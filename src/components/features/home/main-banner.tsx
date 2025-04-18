import { clsx } from 'clsx';
import Image from 'next/image';
import { MAIN_CHARACTER_URL } from '@/constants/default-image-url';
import type { Banner } from '@/types/main-banner';

const MainBanner = ({ title, text, color }: Banner) => {
  return (
    <div
      className={clsx(
        'relative h-[238px] w-[1280px] overflow-hidden',
        color === 'orange' && 'bg-banner-orange',
        color === 'blue' && 'bg-banner-blue',
        color === 'red' && 'bg-banner-red'
      )}
    >
      <div className="absolute left-[40px] top-[135px] inline-flex flex-col items-start justify-start gap-2.5">
        <strong className="justify-start self-stretch text-3xl font-bold text-secondary-grey-900">{title}</strong>
        <p className="w-full justify-start self-stretch text-base leading-snug text-secondary-grey-900">{text}</p>
      </div>
      <div className="absolute left-[1001px] top-[48px] h-44 w-32 overflow-hidden">
        <Image
          priority
          src={MAIN_CHARACTER_URL}
          alt="메인 배너 캐릭터"
          width={124}
          height={168}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default MainBanner;
