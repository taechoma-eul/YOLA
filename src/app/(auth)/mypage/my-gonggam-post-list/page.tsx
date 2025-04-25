import MyGonggamPostClient from '@/components/features/mypage/my-gonggam-post-client';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyGonggamPostListPage = async () => {
  //유저 닉네임 조회
  const profile = await getUserProfile();
  if (!profile) throw new Error('유저의 닉네임 정보를 불러오지 못했습니다');
  const nickname = profile.nickname;
  return <MyGonggamPostClient nickname={nickname} />;
};

export default MyGonggamPostListPage;
