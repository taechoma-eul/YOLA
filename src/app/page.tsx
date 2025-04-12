import CheckListCard from '@/components/features/home/main-checklist-card';
import MainBannerSwiper from '@/components/features/home/main-banner-swiper';
import RandomMissionSection from '@/components/features/home/main-random-mission';
import GonggamPreviewSection from '@/components/features/home/main-gonggam-preview';

const HomePage = () => {
  const checkListTypes: string[] = ['혼밥', '혼자여행', '갓생', '청소', '혼놀'];

  return (
    <>
      <MainBannerSwiper />
      <section className="mt-14 w-[1200px] space-y-[26px]">
        <strong className="justify-start self-stretch text-xl font-semibold leading-7 text-zinc-800">
          YOLA 챌린지
        </strong>
        <div className="flex items-center justify-between self-stretch">
          {checkListTypes.map((item) => (
            <CheckListCard key={item} checkListType={item} />
          ))}
        </div>
      </section>
      <hr className="mx-auto mt-[57px] w-[1200px] outline-neutral-300" />
      <section className="mx-auto mb-[71px] mt-[61px] flex w-[1200px] items-center justify-between self-stretch">
        <RandomMissionSection />
        <div className="h-60 w-0 origin-top-left outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
        <GonggamPreviewSection />
      </section>
    </>
  );
};

export default HomePage;
