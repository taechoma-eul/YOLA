import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const NavChallengeMenu = () => {
  const challengeMenuItem: MenuItem[] = [
    { path: PATH.MEAL_CHECKLIST, label: '혼밥' },
    { path: PATH.TRAVEL_CHECKLIST, label: '혼여' },
    { path: PATH.GOD_LIFE_CHECKLIST, label: '갓생' },
    { path: PATH.CLEAN_CHECKLIST, label: '청소' },
    { path: PATH.PLAY_CHECKLIST, label: '혼놀', isLine: false }
  ];
  return (
    <div data-state="Dropdown" className="inline-flex h-11 items-center justify-center gap-2.5 py-2.5">
      <HeaderDropdownMenu menuItems={challengeMenuItem} align="center">
        <p className="w-[69px] justify-start text-center text-lg text-zinc-800">챌린지</p>
      </HeaderDropdownMenu>
    </div>
  );
};

export default NavChallengeMenu;
