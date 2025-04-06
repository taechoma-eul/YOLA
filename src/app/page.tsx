import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import MainBannerSwiper from '@/components/features/home/main-banner-swiper';
import CheckListCard from '@/components/features/home/main-checklist-card';
import RandomMissionBox from '@/components/features/home/main-random-mission-box';

const HomePage = async () => {
  const uniqueTypes = await getUniqueMissionType();

  console.log('uniqueTypes', uniqueTypes);
  return (
    <div className="space-y-14">
      <MainBannerSwiper />
      <section className="space-y-5">
        <strong className="text-xl">YOLA 챌린지</strong>
        <div className="flex gap-10">
          {uniqueTypes.map((item, index) => (
            <CheckListCard key={index} checkListType={item} />
          ))}
        </div>
      </section>
      <hr className="mx-auto w-full max-w-[1280px] outline-neutral-300" />
      <section className="relative flex">
        <RandomMissionBox />
        <div className="absolute -top-2 left-[50%] h-72 w-0 outline outline-1 outline-neutral-200" />
      </section>
    </div>
  );
};

export default HomePage;
