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
        <div className="flex h-[25px] w-[72px] justify-between text-center">
          챌린지
          <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 10.5L7 16.5L13 10.5"
              stroke="#6F757B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </HeaderDropdownMenu>
    </div>
  );
};

export default NavChallengeMenu;
