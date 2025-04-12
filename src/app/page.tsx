import { getUserSessionState } from '@/lib/utils/api/auth-action';
import CheckListCard from '@/components/features/home/main-checklist-card';
import GonggamPreviewBox from '@/components/features/home/main-gonggam-preview';
import MainBannerSwiper from '@/components/features/home/main-banner-swiper';
import RandomMissionSection from '@/components/features/home/main-random-mission-section';

const HomePage = async () => {
  const { isLogin } = await getUserSessionState();

  const checkListTypes: string[] = ['혼밥', '혼자여행', '갓생', '청소', '혼놀'];

  return (
    <>
      <MainBannerSwiper />
      <section className="mt-14 w-[1280px] space-y-[26px] px-[40px]">
        <strong className="justify-start self-stretch text-xl font-semibold leading-7 text-zinc-800">
          YOLA 챌린지
        </strong>
        <div className="flex items-center justify-between self-stretch">
          {checkListTypes.map((item) => (
            <CheckListCard key={item} checkListType={item} />
          ))}
        </div>
      </section>
      <hr className="mx-auto mt-[57px] w-full max-w-[1280px] outline-neutral-300" />
      <section className="relative mt-[61px] grid max-w-[1280px] grid-cols-2 place-content-evenly items-center justify-items-center gap-4">
        <RandomMissionSection isLogin={isLogin} />
        <div className="absolute left-[50%] h-[237px] w-0 outline outline-1 outline-neutral-200" />
        <GonggamPreviewBox />
      </section>
    </>
  );
};

export default HomePage;
