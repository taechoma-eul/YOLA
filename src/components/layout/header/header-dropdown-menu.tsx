'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import HeaderDropdownMenuItem from '@/components/layout/header/header-dropdown-menu-item';
import { PATH } from '@/constants/page-path';
import type { Children } from '@/types/children';
import type { MenuItem } from '@/types/components/header';

interface MenuProps extends Children {
  menuItems: MenuItem[];
}

const HeaderDropdownMenu = ({ menuItems, children }: MenuProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  const isSelect: boolean = fullUrl.includes(PATH.CHECKLIST);
  const isMission: boolean = fullUrl.includes('mission_id');

  return (
    <div className="group relative flex h-11 items-center">
      <button className={clsx(isSelect || isMission ? 'text-[#DC6803]' : 'text-zinc-80')}>{children}</button>
      <div className="invisible absolute right-0 top-11 flex w-[100px] transform flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-0 opacity-0 shadow-[0px_0px_3px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-gray-300 transition-all duration-150 ease-in-out group-hover:visible group-hover:opacity-100">
        {menuItems.map((item, index) => (
          <HeaderDropdownMenuItem
            key={index}
            label={item.label}
            pathname={pathname}
            isLine={item.isLine}
            isButton={item.isButton}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderDropdownMenu;
