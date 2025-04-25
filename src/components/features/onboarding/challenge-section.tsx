import Image from 'next/image';
import CHECKLIST_CARD from '@images/images/onboarding-checklist-card.svg';
import TextBlock from '@/components/features/onboarding/text-block';

const ChallengeSection = () => {
  return (
    <section className="flex w-full flex-col items-center bg-white py-[90px]">
      <TextBlock title="YOLA 챌린지">혼자만의 여유 시간에 즐길 수 있는 다양한 챌린지들이 준비되어 있어요</TextBlock>
      <Image
        src={CHECKLIST_CARD}
        alt="체크리스트 카드 미리보기"
        width={715}
        height={454}
        className="mt-[45px]"
        draggable="false"
      />
    </section>
  );
};

export default ChallengeSection;
