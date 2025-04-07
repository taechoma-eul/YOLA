import { PATH } from '@/constants/page-path';
import Link from 'next/link';

const TitleBox = () => {
  return (
    <div className="mb-4 flex w-full items-end justify-between">
      <strong className="text-xl font-semibold">1인 가구 공감 게시판</strong>
      <Link href={PATH.GONGGAM} className="text-sm font-normal text-zinc-500">
        전체보기
      </Link>
    </div>
  );
};

export default TitleBox;
