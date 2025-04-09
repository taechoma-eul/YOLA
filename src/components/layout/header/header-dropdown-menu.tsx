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
    <div className="dropdown-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger
          asChild
          className="text-md font-normal focus:bg-transparent data-[state=open]:bg-transparent"
        >
          <button>{children}</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          sideOffset={8}
          className="flex w-[100px] min-w-0 flex-col items-center justify-center self-stretch overflow-hidden rounded-xl p-0"
          style={{ pointerEvents: 'auto' }}
        >
          {menuItems.map((item, index) => (
            <HeaderDropdownMenuItem
              key={index}
              label={item.label}
              path={item.path}
              isLine={item.isLine}
              isButton={item.isButton}
              href={item.href}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderDropdownMenu;
