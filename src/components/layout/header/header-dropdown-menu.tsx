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

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="dropdown-wrapper relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger
          asChild
          className="text-md font-normal focus:bg-transparent data-[state=open]:bg-transparent"
        >
          <div className="">{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          sideOffset={8}
          className="inline-flex w-[140px] flex-col items-center gap-3 rounded-xl bg-white p-5 shadow-none"
          style={{ pointerEvents: 'auto' }}
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
    </div>
  );
};

export default HeaderDropdownMenu;
