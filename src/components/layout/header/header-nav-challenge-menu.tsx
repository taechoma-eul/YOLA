'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import HeaderDropdownMenuItem from '@/components/layout/header/header-dropdown-menu-item';
import NavLabel from '@/components/layout/header/header-nav-label';
import NavUnderBar from '@/components/layout/header/header-nav-under-bar';
import { PATH } from '@/constants/page-path';
import MENU_ICON from '@images/images/challenge_menu.svg';

const NavChallengeMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const fullUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  const isSelect: boolean = fullUrl.includes(PATH.CHECKLIST);
  const isMission: boolean = fullUrl.includes('mission_id');

  const challengeMenuItem = [
    { href: PATH.MEAL_CHECKLIST, label: '혼밥' },
    { href: PATH.TRAVEL_CHECKLIST, label: '혼자여행' },
    { href: PATH.GOD_LIFE_CHECKLIST, label: '갓생' },
    { href: PATH.CLEAN_CHECKLIST, label: '청소' },
    { href: PATH.PLAY_CHECKLIST, label: '혼놀', isLine: false }
  ];

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-[44px] w-[72px] items-center justify-between gap-2.5 py-2.5"
    >
      <div className="relative">
        <NavLabel label="챌린지" isBold={isHovered || isSelect || isMission} />
        <NavUnderBar isVisible={isHovered || isSelect || isMission} />
      </div>
      <Image
        src={MENU_ICON}
        alt="챌린지 메뉴 드롭 다운 표시"
        width={14}
        height={26}
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="invisible absolute right-0 top-11 flex w-[100px] transform flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-0 opacity-0 shadow-[0px_0px_3px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-secondary-grey-300 transition-all duration-150 ease-in-out group-hover:visible group-hover:opacity-100">
        {challengeMenuItem.map((item, index) => (
          <HeaderDropdownMenuItem
            key={index}
            label={item.label}
            pathname={pathname}
            isLine={item.isLine}
            href={item.href}
          />
        ))}
      </div>
    </li>
  );
};

export default NavChallengeMenu;
