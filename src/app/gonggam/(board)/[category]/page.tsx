interface GonggamCategoryBoardProps {
  params: { category: string };
}

const GonggamCategoryBoard = ({ params: { category } }: GonggamCategoryBoardProps) => {
  return <div>{category}탭의 콘텐츠입니다.</div>;
};

export default GonggamCategoryBoard;
