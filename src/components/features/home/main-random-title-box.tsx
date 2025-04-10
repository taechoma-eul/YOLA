const TitleBox = () => {
  const text = [
    '혼자서 보내는 시간이 지루하게 느껴질 때,',
    '다양한 주제의 랜덤 미션을 통해',
    '매일 색다른 하루를 만들어보세요.'
  ];

  return (
    <div className="flex flex-col items-start justify-start gap-8 self-stretch">
      <div className="h-5 justify-start self-stretch text-xl font-semibold">오늘의 랜덤 미션</div>
      <div className="justify-start self-stretch text-sm leading-tight">
        {text.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default TitleBox;
