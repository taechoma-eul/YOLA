import { getUserSessionState } from '@/lib/utils/api/auth-action';
import ImageSection from '@/components/features/home/main-random-mission-image';
import MissionButton from '@/components/features/home/main-random-mission-button';
import RandomMissionContainer from '@/components/features/home/main-random-mission-container';
import TitleSection from '@/components/features/home/main-random-title-box';

const RandomMissionSection = async () => {
  const { isLogin } = await getUserSessionState();

  return (
    <RandomMissionContainer>
      <div className="flex h-full w-60 flex-col gap-[71px]">
        <TitleSection />
        <MissionButton isLogin={isLogin} />
      </div>
      <ImageSection />
    </RandomMissionContainer>
  );
};

export default RandomMissionSection;
