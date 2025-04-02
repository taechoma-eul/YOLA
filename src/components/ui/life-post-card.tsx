import Image from 'next/image';
import SAMPLE_IMAGE from '@images/images/sample-image.jpeg';
import type { LifePost } from '@/types/life-post';

type LifePostCardProps = {
  lifePost: LifePost;
};

const LifePostCard = ({ lifePost }: LifePostCardProps) => {
  return (
    <div className="flex h-screen max-h-[279px] max-w-[222px] flex-col items-center rounded-lg border">
      <figure className="relative h-[161px] w-full">
        <Image
          src={SAMPLE_IMAGE}
          alt="라이프 포스트 이미지"
          width={221}
          height={161}
          className="rounded-t-lg object-cover"
        />
      </figure>
      <strong>{lifePost.content}</strong>
      <div>🌤️덜나이뜨</div>
      <div>{lifePost.created_at.slice(0, 10).replaceAll('-', '.')}</div>
    </div>
  );
};

export default LifePostCard;
