import MyLifeListClient from '@/components/features/mypage/my-life-list-client';
import { getUserProfile } from '@/lib/utils/api/auth-action';

const MyLifeListPage = async () => {
  const profile = await getUserProfile();

  return (
    <div>
      <strong>{profile?.nickname}님의 혼자 라이프 기록</strong>
      <MyLifeListClient />
    </div>
  );
};

export default MyLifeListPage;
