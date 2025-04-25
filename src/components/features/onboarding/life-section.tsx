import Image from 'next/image';
import TextBlock from './text-block';
import LIFE_PREVIEW from '@images/images/onboarding-life.svg';

const LifeSection = () => {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-white py-[165px]">
      <TextBlock title="혼자라이프 달력">
        오늘의 혼자 보내는 일상에 대한 일기를 적고, <br />
        작성한 날짜를 선택해 일기를 확인할 수 있어요.
      </TextBlock>
      <Image src={LIFE_PREVIEW} alt="혼자 라이프 캘린더 미리보기" width={677} height={275} draggable="false" />
    </section>
  );
};

export default LifeSection;
