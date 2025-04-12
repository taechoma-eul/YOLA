import { getUserProfile } from '@/lib/utils/api/auth.api';
import EditProfileForm from '@/components/features/mypage/edit-profile-form';

const MyPage = async () => {
  const profile = await getUserProfile();

  return (
    <>
      <h1 className="my-10 text-xl font-bold">프로필 수정</h1>
      <EditProfileForm initProfile={profile} />
    </>
  );
};

export default MyPage;
