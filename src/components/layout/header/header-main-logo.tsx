import Image from 'next/image';
import Link from 'next/link';
import { MAIN_LOGO_URL } from '@/constants/default-image-url';
import { PATH } from '@/constants/page-path';

const MainLogo = () => {
  return (
    <Link href={PATH.HOME} className="flex h-[44px] w-[104px] items-center justify-center">
      <Image src={MAIN_LOGO_URL} alt="YOLA 메인 로고" width={84} height={23} />
    </Link>
  );
};

export default MainLogo;
