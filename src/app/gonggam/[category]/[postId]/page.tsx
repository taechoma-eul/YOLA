interface GonggamPostDetailProps {
  params: { postId: string };
}

const page = ({ params: { postId } }: GonggamPostDetailProps) => {
  return <div>{postId} 상세 콘텐츠입니다.</div>;
};

export default page;
