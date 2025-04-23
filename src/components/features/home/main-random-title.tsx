const TitleSection = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-[22px] self-stretch">
      <strong className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
        오늘의 랜덤 미션
      </strong>
      <p className="flex h-[60px] items-center self-stretch text-sm leading-tight text-secondary-grey-900">
        혼자서 보내는 시간이 지루하게 느껴질 때, <br />
        다양한 주제의 랜덤 미션을 통해 <br />
        매일 색다른 하루를 만들어보세요.
      </p>
    </div>
  );
};

export default TitleSection;
