import TextBlock from './text-block';
import Image from 'next/image';
import GONGGAM_BOARD_PREVIEW from '@images/images/onboarding-gonggam.svg';

const GonggamBoardSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-white py-[165px]">
      <TextBlock title="공감 게시판">나의 일상을 다른 사람들과 함게 공유해요</TextBlock>
      <Image src={GONGGAM_BOARD_PREVIEW} alt="공감 게시판 미리보기" width={608} height={186} draggable="false" />
    </section>
  );
};

export default GonggamBoardSection;
