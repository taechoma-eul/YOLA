import MyLifeListClient from '@/components/features/mypage/my-life-list-client';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyLifeListPage = async () => {
  const profile = await getUserProfile();
  if (!profile) throw new Error();

  return (
    <section className="mt-[20px] px-[16px] md:mt-[72px]">
      <h2 className="mb-[35px] hidden justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900 md:block">
        {profile.nickname}님의 혼자 라이프 기록
      </h2>
      <MyLifeListClient />
    </section>
  );
};

export default MyLifeListPage;
