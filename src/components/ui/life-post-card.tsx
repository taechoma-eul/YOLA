import Image from 'next/image';
import SAMPLE_IMAGE from '@images/images/sample-image.jpeg';
import { LifePost } from '@/types/life-post';

type LifePostCardProps = {
  lifePost: LifePost;
};

const LifePostCard = ({ lifePost }: LifePostCardProps) => {
  console.log(lifePost);
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border">
      <figure>
        <Image src={SAMPLE_IMAGE} alt="라이프 포스트 이미지" width={200} height={100} className="rounded-md border" />
      </figure>
      <strong>{lifePost.content}</strong>
      <div>{lifePost.created_at.slice(0, 10)}</div>
      <div>작성시간 : {lifePost.created_at.slice(11, 16)}</div>
    </div>
  );
};

export default LifePostCard;
