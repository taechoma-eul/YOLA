import CheckListCard from '@/components/features/home/main-checklist-card';
import MainBannerSwiper from '@/components/features/home/main-banner-swiper';
import RandomMissionSection from '@/components/features/home/main-random-mission';
import GonggamPreviewSection from '@/components/features/home/main-gonggam-preview';

const HomePage = async () => {
  const checkListTypes: string[] = ['혼밥', '혼자여행', '갓생', '청소', '혼놀'];

  return (
    <>
      <MainBannerSwiper />
      <section className="mt-[46px] flex w-[1200px] flex-col gap-[26px]">
        <strong className="text-secondary-grey-900 justify-start self-stretch text-xl font-semibold leading-7">
          YOLA 챌린지
        </strong>
        <div className="flex items-center justify-between self-stretch">
          {checkListTypes.map((item) => (
            <CheckListCard key={item} checkListType={item} />
          ))}
        </div>
      </section>
      <hr className="outline-secondary-grey-200 mx-auto mt-[57px] w-[1200px]" />
      <section className="mx-auto mb-[73px] mt-[61px] flex w-[1200px] items-center justify-between self-stretch">
        <RandomMissionSection />
        <div className="h-60 w-0 origin-top-left outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
        <GonggamPreviewSection />
      </section>
    </>
  );
};

export default HomePage;
