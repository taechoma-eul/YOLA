import Link from 'next/link';
import { PATH } from '@/constants/page-path';

const TitleSection = () => {
  return (
    <div className="inline-flex items-center justify-between self-stretch">
      <strong className="justify-start text-xl font-semibold leading-7 text-zinc-800">1인가구 공감 게시판</strong>

      <Link href={PATH.GONGGAM} className="text-secondary-grey-900 flex h-[28px] items-center text-sm font-normal">
        <p className="h-[17px] w-[49px]">전체보기</p>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 9L11 6L8 3" stroke="#2E3135" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Link>
    </div>
  );
};

export default TitleSection;
