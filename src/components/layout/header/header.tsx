import Link from 'next/link';
import { User } from 'lucide-react';
import { PATH } from '@/constants/page-path';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';

const Header = () => {
  const challengeMenuItem = [
    { path: PATH.CHECKLIST, label: '혼밥', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '혼여', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '갓생', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '청소', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '혼놀', isLine: false, isButton: false }
  ];

  const userMenuItem = [
    { path: PATH.MYPAGE, label: '마이페이지', isLine: true, isButton: false },
    { path: '', label: '로그아웃', isLine: false, isButton: true }
  ];

  return (
    <header className="mx-auto w-[1200px]">
      <div className="flex h-[120px] items-center justify-between px-6">
        <div className="flex items-center justify-start gap-[65px]">
          <Link
            href={PATH.HOME}
            className="flex h-12 w-44 items-center justify-center bg-zinc-300 text-center text-3xl font-bold text-black"
          >
            YOLA
          </Link>
          <nav className="flex items-center justify-center gap-[38px]">
            <Link href={PATH.LIFE}>혼자라이프 기록</Link>
            <Link href={PATH.GONGGAM}>공감게시판</Link>
            <HeaderDropdownMenu menuItems={challengeMenuItem}>챌린지</HeaderDropdownMenu>
          </nav>
        </div>
        <HeaderDropdownMenu menuItems={userMenuItem}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-300">
            <User color="#ffffff" />
          </div>
        </HeaderDropdownMenu>
      </div>
      <hr className="w-[1200px] outline-neutral-300" />
    </header>
  );
};

export default Header;
