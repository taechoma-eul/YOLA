import TextBlock from '@/components/features/onboarding/text-block';
import Image from 'next/image';
import MISSION_PREVIEW from '@images/images/onboarding-mission.svg';
import LEVEL_PREVIEW from '@images/images/onboarding-level.svg';

const MissionSection = () => {
  return (
    <section className="flex w-full flex-col items-center bg-secondary-grey-100 px-10 py-[90px]">
      <TextBlock title="챌린지 인증하기">
        미션을 인증했다면, 인증글을 작성해 레벨을 높일 수 있어요. <br />
        챌린지 탭에서 바로 인증글을 작성해 보세요!
      </TextBlock>
      <Image
        src={MISSION_PREVIEW}
        alt="챌린지 미션 인증 작성 미리보기"
        width={548}
        height={288}
        className="mb-20 mt-10"
      />
      <TextBlock title="레벨 시스템">
        챌린지별로 레벨을 확인할 수 있어요. <br />
        다양한 미션을 수행하며 레벨을 높여봐요!
      </TextBlock>
      <Image src={LEVEL_PREVIEW} alt="레벨 시스템 미리보기" width={548} height={288} className="mt-10" />
    </section>
  );
};

export default MissionSection;
