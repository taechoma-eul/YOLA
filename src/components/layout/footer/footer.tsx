import Image from 'next/image';
import FOOTER_LOGO from '@images/images/footer-logo.svg';

const Footer = () => {
  return (
    <div className="flex h-[150px] w-full flex-col items-center justify-center justify-items-center overflow-hidden bg-secondary-grey-150">
      <div className="mx-auto flex h-[44px] items-center justify-center">
        <Image src={FOOTER_LOGO} alt="푸터 로고" width={84} height={23} />
      </div>
      <p className="mt-[2px] justify-start self-stretch text-center text-xs leading-tight text-secondary-grey-800">
        ⓒ 2025. 태초마을 all rights reserved.
      </p>
    </div>
  );
};

export default Footer;
