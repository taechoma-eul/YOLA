'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ChallengeMenuItem from '@/components/layout/header/header-challenge-menu-item';
import { PATH } from '@/constants/page-path';

const ChallengeMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const challengeMenuItem = [
    { path: PATH.CHECKLIST, label: '혼밥', isLine: true },
    { path: PATH.CHECKLIST, label: '혼여', isLine: true },
    { path: PATH.CHECKLIST, label: '갓생', isLine: true },
    { path: PATH.CHECKLIST, label: '청소', isLine: true },
    { path: PATH.CHECKLIST, label: '혼놀', isLine: false }
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        className="text-md font-normal focus:bg-transparent data-[state=open]:bg-transparent"
        onMouseEnter={() => setIsOpen(true)} // hover 시 열기
        onMouseLeave={() => setIsOpen(false)} // 떠나면 닫기
      >
        <button className="focus:outline-none">챌린지</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="inline-flex w-[140px] flex-col items-center gap-3 rounded-xl bg-white p-5 shadow-none"
        onMouseEnter={() => setIsOpen(true)} // 드롭다운 메뉴에 마우스가 들어가면 유지
        onMouseLeave={() => setIsOpen(false)} // 떠나면 닫기
      >
        {challengeMenuItem.map((item, index) => (
          <ChallengeMenuItem key={index} label={item.label} path={item.path} isLine={item.isLine} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChallengeMenu;
