import Image from 'next/image';
import TextBlock from '@/components/features/onboarding/text-block';
import RANDOM_MISSION_PREVIEW from '@images/images/onboarding-random-mission.svg';

const RandomMissionSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-secondary-grey-100 py-[165px]">
      <TextBlock title="오늘의 랜덤 미션">
        날마다 다른 특별한 랜덤 미션을 뽑아 보세요! <br />
        (미션 인증 기능은 추후 지원 예정입니다)
      </TextBlock>
      <Image src={RANDOM_MISSION_PREVIEW} alt="오늘의 랜덤 미션 미리보기" width={713} height={353} draggable="false" />
    </section>
  );
};

export default RandomMissionSection;
