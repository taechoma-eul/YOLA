import { ChevronDown } from 'lucide-react';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const NavChallengeMenu = () => {
  const challengeMenuItem: MenuItem[] = [
    { href: PATH.MEAL_CHECKLIST, label: '혼밥', path: PATH.MEAL },
    { href: PATH.TRAVEL_CHECKLIST, label: '혼여', path: PATH.TRAVEL },
    { href: PATH.GOD_LIFE_CHECKLIST, label: '갓생', path: PATH.GOD_LIFE },
    { href: PATH.CLEAN_CHECKLIST, label: '청소', path: PATH.CLEAN },
    { href: PATH.PLAY_CHECKLIST, label: '혼놀', isLine: false, path: PATH.PLAY }
  ];
  return (
    <div data-state="Dropdown" className="inline-flex h-11 items-center justify-center gap-2.5 py-2.5">
      <HeaderDropdownMenu menuItems={challengeMenuItem} align="center">
        <div className="flex w-[69px] justify-between text-center">
          챌린지
          <ChevronDown color="#6F757B" />
        </div>
      </HeaderDropdownMenu>
    </div>
  );
};

export default NavChallengeMenu;
