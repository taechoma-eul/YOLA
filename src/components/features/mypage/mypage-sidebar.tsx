import { getUserProfile } from '@/lib/utils/api/auth.api';
import ProfileBox from '@/components/features/mypage/mypage-sidebar-profile';

const MypageSideBar = async () => {
  const initProfile = await getUserProfile();
  if (!initProfile) throw Error;

  return (
    <aside className="mt-[40px] flex h-[calc(100vh-150px)] w-full flex-col items-center gap-5 md:w-60">
      {/* 내 프로필 보기 */}
      <ProfileBox initProfile={initProfile} />
    </aside>
  );
};

export default MypageSideBar;
