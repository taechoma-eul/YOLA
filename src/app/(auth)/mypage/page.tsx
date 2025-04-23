import EditProfileForm from '@/components/features/mypage/edit-profile-form';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyPage = async () => {
  const profile = await getUserProfile();
  if (!profile) throw Error;

  return (
    <>
      <h1 className="mb-[24px] mt-[72px] self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
        프로필 수정
      </h1>
      <EditProfileForm initProfile={profile} />
    </>
  );
};

export default MyPage;
