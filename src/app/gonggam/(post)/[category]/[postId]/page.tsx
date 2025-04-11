import GonggamPostInteraction from '@/components/features/gonggam/gonggam-post-interaction';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { getPostMetaByPostId } from '@/lib/utils/api/gonggam-board.api';
import { getGonggamPostDetail } from '@/lib/utils/api/gonggam-detail.api';
import { getKoreanDateTime } from '@/lib/utils/utc-to-kst';
import { Dot } from 'lucide-react';
import Image from 'next/image';

interface GonggamPostDetailProps {
  params: {
    category: string;
    postId: number;
  };
}

const GonggamPostDetail = async ({ params: { category, postId } }: GonggamPostDetailProps) => {
  const { title, content, created_at, updated_at, profile, images, tags } = await getGonggamPostDetail(postId);
  const displayDate = updated_at ?? created_at;
  const postMeta = await getPostMetaByPostId(postId); // 좋아요, 댓글 개수

  return (
    <article className="space-y-4">
      {/* 게시글 헤더 */}
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">{title}</h1>
        {/* 작성자 정보 및 시간 + 구분선 */}
        <div className="mb-4 flex items-center gap-1 border-b pb-4 text-sm text-muted-foreground">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={profile.profileImage ?? DEFAULT_AVATAR_URL}
              alt={`${profile.nickname}의 프로필 이미지`}
              fill
              className="object-cover"
            />
          </div>
          <span>{profile.nickname}</span>
          <Dot size={12} />
          <time dateTime={displayDate}>{getKoreanDateTime(displayDate)}</time>
        </div>
      </header>

      {/* 이미지 영역 */}
      {images.length > 0 && (
        <section className="mb-6 space-y-4">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-square w-full max-w-[379px] overflow-hidden rounded-md">
              <Image src={url} alt={`게시글 이미지 ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </section>
      )}
      {/* 본문 영역 */}
      <section className="prose prose-sm sm:prose lg:prose-lg max-w-none">
        <p>{content}</p>
      </section>
      {/* 좋아요/태그/댓글 영역 */}
      <GonggamPostInteraction postId={postId} postMeta={postMeta} tags={tags ?? []} />
    </article>
  );
};

export default GonggamPostDetail;
