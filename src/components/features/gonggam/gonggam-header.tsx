import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import Link from 'next/link';

const GonggamHeader = () => {
  return (
    <section className="mt-[44px] flex justify-between px-[10px] py-[8px]">
      <h1 className="py-[5px] text-center text-[20px] font-semibold leading-[140%]">혼자 라이프 공감 게시판</h1>
      <Link href={PATH.GONGGAM_POST}>
        <CustomButton size="gonggam-write">글 작성하기</CustomButton>
      </Link>
    </section>
  );
};

export default GonggamHeader;
