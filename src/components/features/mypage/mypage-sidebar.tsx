import Image from 'next/image';
import Link from 'next/link';
import DEFAULT_AVATAR from '@images/images/default-avatar.png';
import { PATH } from '@/constants/page-path';
import { getUserId, getUserMetadata } from '@/lib/utils/api/auth-action';

const MypageSideBar = async () => {
  const userMetadata = await getUserMetadata();

  return (
    <aside className="flex w-full flex-col items-center gap-5 p-5 md:fixed md:h-full md:w-60">
      {/* 내 프로필 보기 */}
      <section className="flex w-full flex-col items-center justify-center gap-3 rounded-md border p-5">
        <figure>
          <Image src={DEFAULT_AVATAR} alt="프로필 이미지" width={150} height={150} className="rounded-full border" />
        </figure>
        <p className="font-bold">{userMetadata?.name}</p>
        <p>{userMetadata?.email}</p>
        <Link href={PATH.MYPAGE}>
          <button className="rounded-full bg-gray-200 p-1 px-2 text-xs text-black">프로필 수정</button>
        </Link>
      </section>

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
