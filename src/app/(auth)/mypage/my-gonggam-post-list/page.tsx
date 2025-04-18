import MyGonggamPostClient from '@/components/features/mypage/my-gonggam-post-client';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyGonggamPostListPage = async () => {
  //유저 닉네임 조회
  const profile = await getUserProfile();
  if (!profile) throw new Error();
  const nickname = profile.nickname;
  return (
    <div>
      <MyGonggamPostClient nickname={nickname} />
    </div>
  );
};

export default MyGonggamPostListPage;
