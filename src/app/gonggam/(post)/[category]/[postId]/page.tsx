interface GonggamPostDetailProps {
  params: {
    category: string;
    postId: string;
  };
}

const page = ({ params: { category, postId } }: GonggamPostDetailProps) => {
  return (
    <div>
      {category} / {postId}번 글 콘텐츠입니다.
    </div>
  );
};

export default page;
