import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/page-path';
import Link from 'next/link';

const GonggamHeader = () => {
  return (
    <section className="mb-5 flex justify-between">
      <h1 className="text-2xl font-extrabold">혼자 라이프 공감 게시판</h1>
      <Link href={PATH.GONGGAM_POST}>
        <Button>글 작성하기</Button>
      </Link>
    </section>
  );
};

export default GonggamHeader;
