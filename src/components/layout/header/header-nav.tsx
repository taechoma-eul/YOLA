import Link from 'next/link';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const HeaderNav = () => {
  const challengeMenuItem: MenuItem[] = [
    { path: PATH.CHECKLIST, label: '혼밥', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '혼여', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '갓생', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '청소', isLine: true, isButton: false },
    { path: PATH.CHECKLIST, label: '혼놀', isLine: false, isButton: false }
  ];

  return (
    <nav className="flex items-center justify-center gap-[38px]">
      <Link href={PATH.LIFE}>혼자라이프 기록</Link>
      <Link href={PATH.GONGGAM}>공감게시판</Link>
      <HeaderDropdownMenu menuItems={challengeMenuItem} align="center">
        챌린지
      </HeaderDropdownMenu>
    </nav>
  );
};

export default HeaderNav;
