import { Dot } from 'lucide-react';
import Image from 'next/image';
import GonggamCommentForm from '@/components/features/gonggam/gonggam-comment-form';
import GonggamCommentList from '@/components/features/gonggam/gonggam-comment-list';
import GonggamDetailViewCount from '@/components/features/gonggam/gonggam-detail-view-count';
import GonggamImageSwiper from '@/components/features/gonggam/gonggam-image-swiper';
import GonggamLikes from '@/components/features/gonggam/gonggam-likes';
import GonggamMyPostDropdown from '@/components/features/gonggam/gonggam-my-post-dropdown';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';
import { getViewCount } from '@/lib/utils/api/gonggam/gonggam-board.api';
import { getGonggamPostDetail } from '@/lib/utils/api/gonggam/gonggam-detail.api';
import { getKoreanDateTime } from '@/lib/utils/utc-to-kst';

interface GonggamPostDetailProps {
  params: {
    postId: number;
  };
}

const GonggamPostDetail = async ({ params: { postId } }: GonggamPostDetailProps) => {
  const userData = await getUserProfile();
  const { title, content, created_at, updated_at, profile, images, tags } = await getGonggamPostDetail(postId);
  const viewCount = await getViewCount(String(postId));

  const displayDate = updated_at ?? created_at;

  return (
    <article className="px-[40px]">
      {/* 게시글 헤더 */}
      <header className="mt-[64px]">
        <h1 className="mb-[12px] justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {title}
        </h1>
        {/* 작성자 정보 및 시간 + 구분선 */}
        <section className="flex items-center border-b pb-[20px] text-base text-secondary-grey-800">
          <div className="flex items-center">
            <div className="relative mr-[6px] h-[22px] w-[22px] overflow-hidden rounded-full">
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
            <Dot size={12} />
            {/* 디테일 뷰카운트 */}
            <GonggamDetailViewCount postId={String(postId)} initCount={viewCount} />
          </div>
          {/* {userId === profile.id && <GonggamMyPostDropdown />} */}
          {userData?.id === profile.id && <GonggamMyPostDropdown postId={postId} />}
        </section>
      </header>

      {/* 이미지 영역 */}
      {images.length > 0 && (
        <figure className="mb-[40px] mt-[46px] w-full">
          <GonggamImageSwiper images={images} />
        </figure>
      )}

      {/* 본문 영역 */}
      <section className="prose prose-sm sm:prose lg:prose-lg mb-[46px] mt-[40px] max-w-none justify-start text-[16px] text-secondary-grey-800">
        <p className="whitespace-pre-wrap">{content}</p>
      </section>

      {/* 좋아요 영역 */}
      <GonggamLikes postId={postId} userId={userData?.id} />

      {/* 태그 영역 */}
      <ul className="mt-[46px] flex flex-wrap gap-[8px] border-b pb-[38px] text-[12px]">
        {tags?.map((tag) => (
          <li
            key={tag}
            className="border-black/12 rounded-[4px] border bg-secondary-grey-150 px-2 py-1 text-[12px] text-secondary-grey-900"
          >
            # {tag}
          </li>
        ))}
      </ul>

      {/* 댓글 영역 */}
      <GonggamCommentList postId={postId} />
      <GonggamCommentForm
        postId={postId}
        isLogin={!!userData?.id}
        {...(userData?.profile_image && { profileImage: userData.profile_image })}
      />
    </article>
  );
};

export default GonggamPostDetail;
