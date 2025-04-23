import MainBannerSwiper from '@/components/features/home/main-banner-swiper';
import MainBannerSwiperMobile from '@/components/features/home/main-banner-swiper-mobile';
import CheckListCard from '@/components/features/home/main-checklist-card';
import GonggamPreviewSection from '@/components/features/home/main-gonggam-preview';
import RandomMissionSection from '@/components/features/home/main-random-mission';

const HomePage = () => {
  const checkListTypes: string[] = ['혼밥', '혼자여행', '갓생', '청소', '혼놀'];

  return (
    <>
      <MainBannerSwiper />
      <MainBannerSwiperMobile />
      <section className="mt-[38px] flex w-full max-w-[1280px] flex-col gap-[11px] px-[14px] md:mt-[48px] md:gap-[26px] md:px-[38px]">
        <strong className="h-[25px] justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900 md:h-[28px]">
          YOLA 챌린지
        </strong>
        <div
          className="scrollbar-hide flex snap-x snap-mandatory items-center justify-between gap-[11px] overflow-x-auto p-[1px]"
          aria-label="YOLA 챌린지 카드 리스트"
        >
          {checkListTypes.map((item) => (
            <CheckListCard key={item} checkListType={item} />
          ))}
        </div>
      </section>
      <hr className="mx-auto mt-[57px] hidden outline-secondary-grey-200 md:block" />
      <section className="mx-auto mb-[48px] mt-[46px] flex w-full max-w-[1200px] flex-col items-center justify-between self-stretch px-4 md:mb-[73px] md:mt-[61px] md:flex-row md:px-0">
        <RandomMissionSection />
        <div className="hidden h-60 w-0 origin-top-left outline outline-1 outline-offset-[-0.50px] outline-gray-200 md:block" />
        <GonggamPreviewSection />
      </section>
    </>
  );
};

export default HomePage;
