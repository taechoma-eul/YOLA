'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import HeaderDropdownMenuItem from '@/components/layout/header/header-dropdown-menu-item';
import type { Children } from '@/types/children';
import type { MenuItem } from '@/types/components/header';

interface MenuProps extends Children {
  menuItems: MenuItem[];
  align?: 'center' | 'end' | 'start' | undefined;
}

const HeaderDropdownMenu = ({ menuItems, children, align }: MenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        className="text-md font-normal focus:bg-transparent data-[state=open]:bg-transparent"
        onMouseEnter={() => setIsOpen(true)} // hover 시 열기
        onMouseLeave={() => setIsOpen(false)} // 떠나면 닫기
      >
        <button className="focus:outline-none">{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        sideOffset={8}
        className="inline-flex w-[140px] flex-col items-center gap-3 rounded-xl bg-white p-5 shadow-none"
        onMouseEnter={() => setIsOpen(true)} // 드롭다운 메뉴에 마우스가 들어가면 유지
        onMouseLeave={() => setIsOpen(false)} // 떠나면 닫기
      >
        {menuItems.map((item, index) => (
          <HeaderDropdownMenuItem
            key={index}
            label={item.label}
            path={item.path}
            isLine={item.isLine}
            isButton={item.isButton}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdownMenu;
