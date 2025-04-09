import Link from 'next/link';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import ProfileBox from '@/components/features/mypage/mypage-sidebar-profile';
import { PATH } from '@/constants/page-path';

const MypageSideBar = async () => {
  const initProfile = await getUserProfile();

  return (
    <aside className="flex h-[calc(100vh-150px)] w-full flex-col items-center gap-5 p-5 md:fixed md:w-60">
      {/* 내 프로필 보기 */}
      <ProfileBox initProfile={initProfile} />
      {/* 유저 메뉴 */}
      <section className="flex w-full flex-col items-center gap-3 rounded-md border p-3">
        <strong className="w-full rounded-md bg-slate-700 p-1 text-center text-white">USER MENU</strong>
        <div className="flex flex-col gap-3">
          <Link href={PATH.MY_LIFE_LIST}>나의 혼자 라이프 기록</Link>
          <Link href={PATH.MY_GONGGAM_POST_LIST}>나의 공감 게시글</Link>
          <Link href={PATH.MY_ACHIEVEMENT}>나의 체크리스트 달성도</Link>
        </div>
      </section>
    </aside>
  );
};

export default MypageSideBar;
