import Image from 'next/image';
import TITLE from '@images/images/onboarding-title.svg';
import CAT from '@images/images/onboarding-cat.svg';
import SLIDE from '@images/images/onboarding-slide-icon.svg';
import { CustomButton } from '@/components/ui/custom-button';
import Link from 'next/link';
import { PATH } from '@/constants/page-path';

const TitleSection = () => {
  return (
    <section
      aria-label="타이틀 소개 섹션"
      className="relative flex h-[733px] w-full flex-col items-center justify-center bg-primary-orange-50"
    >
      <Image src={TITLE} alt="온보딩 페이지 타이틀: 혼자서도 즐겁게!" width={388} height={48} draggable="false" />
      <p className="mb-[80px] mt-[32px] text-center">
        YOLA는 혼자만의 하루를 의미 있고 즐겁게 만드는 라이프 기록 서비스예요.
        <br /> 일상을 가볍게 기록하고, 작은 도전으로 혼자 라이프를 즐겨보세요!
      </p>
      <CustomButton asChild>
        <Link href={PATH.HOME} aria-label="메인 페이지로 이동하기 버튼">
          바로 시작하기
        </Link>
      </CustomButton>
      <Image
        src={CAT}
        alt="온보딩 페이지의 타이틀을 소개하는 고양이 캐릭터"
        width={331}
        height={306}
        className="absolute bottom-0 right-10"
        draggable="false"
      />
      <Image
        src={SLIDE}
        alt="아래로 스크롤 하기 버튼 아이콘"
        width={66}
        height={48}
        className="absolute bottom-[34px] right-[607px]"
        draggable="false"
      />
    </section>
  );
};

export default TitleSection;
