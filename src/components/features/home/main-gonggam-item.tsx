import ContentsContainer from '@/components/features/home/main-gonggam-item-contents-container';
import ReactionBox from '@/components/features/home/main-gonggam-item-reaction-box';
import ItemContainer from '@/components/features/home/main-gonggam-item-container';

const GonggamItem = () => {
  return (
    <ItemContainer>
      <ContentsContainer>
        <h2 className="justify-start self-stretch text-sm">한강에 혼자 뛰시는 분들 많네요</h2>
        <p className="w-80 justify-start overflow-hidden text-ellipsis whitespace-nowrap text-xs">
          날씨가 좋아져서 그런지 러닝 갔더니 혼자 뛰시는 분들 많아서 덜 외롭던데요! 오늘은 어디어디 코스 뛰었는데
          어디갔더니 ...
        </p>
      </ContentsContainer>
      <ReactionBox likes={15} comments={2} />
    </ItemContainer>
  );
};

export default GonggamItem;
