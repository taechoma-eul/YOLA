const RandomMissionBox = () => {
  return (
    <div className="inline-flex items-center justify-start gap-16">
      <div className="inline-flex w-56 flex-col items-start justify-start gap-24">
        <div className="flex flex-col items-start justify-start gap-8 self-stretch">
          <div className="h-5 justify-start self-stretch text-xl font-semibold text-black">오늘의 랜덤 미션</div>
          <div className="justify-start self-stretch text-sm font-normal leading-tight text-black">
            혼자서 보내는 시간이 지루하게 느껴질 때, 다양한 주제의 랜덤 미션을 통해 매일 색다른 하루를 만들어보세요.
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded p-2.5 outline outline-1 outline-offset-[-1px] outline-stone-300">
          <div className="justify-start text-xs font-normal leading-tight text-black">랜덤미션 뽑기</div>
        </div>
      </div>
      <div className="h-64 w-56 bg-zinc-300" />
    </div>
  );
};

export default RandomMissionBox;
