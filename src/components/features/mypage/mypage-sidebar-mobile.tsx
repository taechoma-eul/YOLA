import { getUserProfile } from '@/lib/utils/api/auth/auth.api';
import MobileProfileBox from '@/components/features/mypage/mypage-sidebar-profile-mobile';

const MypageSidebarMobile = async () => {
  const initProfile = await getUserProfile();
  if (!initProfile) throw Error;
  return <MobileProfileBox initProfile={initProfile} />;
};
export default MypageSidebarMobile;
