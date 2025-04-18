import MyLifeListClient from '@/components/features/mypage/my-life-list-client';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyLifeListPage = async () => {
  const profile = await getUserProfile();
  if (!profile) throw new Error();

  return (
    <div className="mt-[72px]">
      <div className="mb-[35px] justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
        {profile.nickname}님의 혼자 라이프 기록
      </div>
      <MyLifeListClient />
    </div>
  );
};

export default MyLifeListPage;
