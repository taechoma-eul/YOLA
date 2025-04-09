import MyGonggamPostClient from '@/components/features/mypage/my-gonggam-post-client';
import { getUserProfile } from '@/lib/utils/api/auth-action';

const MyGonggamPostListPage = async () => {
  //유저 닉네임 조회
  const profile = await getUserProfile();
  return (
    <div>
      <strong>{profile.nickname}님이 작성한 공감 게시글</strong>
      <MyGonggamPostClient />
    </div>
  );
};

export default MyGonggamPostListPage;
