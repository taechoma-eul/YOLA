'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { User } from 'lucide-react';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const UserOptionMenu = () => {
  const pathname = usePathname();

  const isSelect: boolean = pathname.includes(PATH.MYPAGE);

  const userMenuItem: MenuItem[] = [
    { href: PATH.MYPAGE, label: '마이페이지' },
    { href: '', label: '로그아웃', isLine: false, isButton: true }
  ];
  return (
    <HeaderDropdownMenu menuItems={userMenuItem} isUserMenu>
      <div
        className={clsx(
          'hover:bg-primary-orange-400 flex size-[36px] items-center justify-center rounded-full hover:text-white',
          isSelect ? 'bg-primary-orange-400 text-white' : 'text-secondary-grey-900 bg-none'
        )}
      >
        <User size={24} />
      </div>
    </HeaderDropdownMenu>
  );
};

export default UserOptionMenu;
