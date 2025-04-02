import Link from 'next/link';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const HeaderNav = () => {
  const challengeMenuItem: MenuItem[] = [
    { path: PATH.MEAL_CHECKLIST, label: '혼밥' },
    { path: PATH.TRAVEL_CHECKLIST, label: '혼여' },
    { path: PATH.GOD_LIFE_CHECKLIST, label: '갓생' },
    { path: PATH.CLEAN_CHECKLIST, label: '청소' },
    { path: PATH.PLAY_CHECKLIST, label: '혼놀', isLine: false }
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
