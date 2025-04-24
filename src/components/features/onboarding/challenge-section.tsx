import Image from 'next/image';
import CHECKLIST_CARD from '@images/images/onboarding-checklist-card.svg';

const ChallengeSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center px-10 py-[90px]">
      <div className="mb-[45px] inline-flex flex-col items-center justify-start gap-4 self-stretch text-center text-lg">
        <strong className="h-[25px] font-semibold leading-relaxed text-primary-orange-700">YOLA 챌린지</strong>
        <p className="h-[25px] justify-start self-stretch text-center text-lg leading-relaxed text-secondary-grey-900">
          혼자만의 여유 시간에 즐길 수 있는 다양한 챌린지들이 준비되어 있어요
        </p>
      </div>
      <Image src={CHECKLIST_CARD} alt="체크리스트 카드 미리보기" width={715} height={454} />
    </section>
  );
};

export default ChallengeSection;
