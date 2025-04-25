import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import Link from 'next/link';

const EndSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-[50px] bg-gradient-to-b from-white to-[#FFF8E3] py-[245px]">
      <div className="flex flex-col items-center justify-start gap-2 self-stretch text-center">
        <strong className="h-[42px] text-3xl font-semibold leading-10 text-primary-orange-600">
          이젠, YOLA와 함께
        </strong>
        <p className="h-[25px] text-lg leading-relaxed">혼자서도 즐거운 일상을 시작해 보세요!</p>
      </div>
      <CustomButton asChild>
        <Link href={PATH.HOME} aria-label="메인 페이지로 이동하기 버튼">
          바로 시작하기
        </Link>
      </CustomButton>
    </section>
  );
};

export default EndSection;
