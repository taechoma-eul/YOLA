import MyLifeListClient from '@/components/features/mypage/my-life-list-client';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyLifeListPage = async () => {
  //유저 닉네임 조회
  const profile = await getUserProfile();
  if (!profile) throw new Error();
  const nickname = profile.nickname;

  return <MyLifeListClient nickname={nickname} />;
};

export default MyLifeListPage;
