import Image from 'next/image';
import { FOOTER_LOGO_URL } from '@/constants/default-image-url';

const Footer = () => {
  return (
    <div className="flex h-36 w-full flex-col items-center justify-center justify-items-center overflow-hidden bg-gray-50">
      <div className="mx-auto flex h-[44px] w-[196px] items-center justify-center gap-2.5 self-stretch">
        <Image src={FOOTER_LOGO_URL} alt="푸터 로고" width={84} height={23} />
      </div>
      <p className="justify-start self-stretch text-center text-xs font-normal leading-none text-neutral-400">
        ⓒ 2025. 태초마을 all rights reserved.
      </p>
    </div>
  );
};

export default Footer;
