import { getUserSessionState } from '@/lib/utils/api/auth.api';
import { getMissionsData } from '@/lib/utils/api/missions.api';
import ImageSection from '@/components/features/home/main-random-mission-image';
import MissionButton from '@/components/features/home/main-random-mission-button';
import RandomMissionContainer from '@/components/features/home/main-random-mission-container';
import TitleSection from '@/components/features/home/main-random-title';

const RandomMissionSection = async () => {
  const { isLogin } = await getUserSessionState();
  const missionData = await getMissionsData();

  return (
    <RandomMissionContainer>
      <div className="flex h-full w-[235px] flex-col gap-[71px]">
        <TitleSection />
        <MissionButton isLogin={isLogin} missionData={missionData} />
      </div>
      <ImageSection />
    </RandomMissionContainer>
  );
};

export default RandomMissionSection;
