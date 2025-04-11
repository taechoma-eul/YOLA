import { getUserSessionState } from '@/lib/utils/api/auth-action';
import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import CheckListCard from '@/components/features/home/main-checklist-card';
import GonggamPreviewBox from '@/components/features/home/main-gonggam-preview';
import MainBannerSwiper from '@/components/features/home/main-banner-swiper';
import RandomMissionBox from '@/components/features/home/main-random-mission-box';
import { getMissionsData } from '@/lib/utils/api/missions.api';

const HomePage = async () => {
  const checkListTypes = await getUniqueMissionType();
  const { isLogin } = await getUserSessionState();
  const missionsData = await getMissionsData();

  return (
    <div className="space-y-14">
      <MainBannerSwiper />
      <section className="space-y-5">
        <strong className="text-xl">YOLA 챌린지</strong>
        <div className="flex gap-10">
          {checkListTypes.map((item) => (
            <CheckListCard key={item} checkListType={item} />
          ))}
        </div>
      </section>
      <hr className="mx-auto w-full max-w-[1280px] outline-neutral-300" />
      <section className="relative grid max-w-[1280px] grid-cols-2 place-content-evenly items-center justify-items-center gap-4">
        <RandomMissionBox missionsData={missionsData} isLogin={isLogin} />
        <div className="absolute left-[50%] h-72 w-0 outline outline-1 outline-neutral-200" />
        <GonggamPreviewBox />
      </section>
    </div>
  );
};

export default HomePage;
