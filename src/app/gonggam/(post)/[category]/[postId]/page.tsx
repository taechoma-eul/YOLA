import { getGonggamPostDetail } from '@/lib/utils/api/gonggam-detail.api';

interface GonggamPostDetailProps {
  params: {
    category: string;
    postId: number;
  };
}

const page = async ({ params: { category, postId } }: GonggamPostDetailProps) => {
  const data = await getGonggamPostDetail(postId);

  // console.log(data);
  return (
    <div>
      {category} / {postId}번 글 콘텐츠입니다.
    </div>
  );
};

export default page;
