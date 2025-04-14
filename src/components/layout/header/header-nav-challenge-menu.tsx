import { ChevronDown } from 'lucide-react';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const NavChallengeMenu = () => {
  const challengeMenuItem: MenuItem[] = [
    { href: PATH.MEAL_CHECKLIST, label: '혼밥' },
    { href: PATH.TRAVEL_CHECKLIST, label: '혼자여행' },
    { href: PATH.GOD_LIFE_CHECKLIST, label: '갓생' },
    { href: PATH.CLEAN_CHECKLIST, label: '청소' },
    { href: PATH.PLAY_CHECKLIST, label: '혼놀', isLine: false }
  ];
  return (
    <div data-state="Dropdown" className="inline-flex h-11 items-center justify-center gap-2.5 py-2.5">
      <HeaderDropdownMenu menuItems={challengeMenuItem}>
        <div className="flex w-[71px] justify-between text-center">
          챌린지
          <ChevronDown color="#6F757B" />
        </div>
      </HeaderDropdownMenu>
    </div>
  );
};

export default NavChallengeMenu;
