import Link from 'next/link';
import { PATH } from '@/constants/page-path';

const TitleSection = () => {
  return (
    <div className="inline-flex items-center justify-between self-stretch">
      <strong className="justify-start text-xl font-semibold leading-7 text-zinc-800">1인가구 공감 게시판</strong>

      <Link href={PATH.GONGGAM} className="justify-start text-sm font-normal text-zinc-800">
        전체보기 &gt;
      </Link>
    </div>
  );
};

export default TitleSection;
