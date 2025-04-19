'use client';

import { clsx } from 'clsx';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import { PATH } from '@/constants/page-path';
import type { MenuItem } from '@/types/header';

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
          'flex size-[36px] items-center justify-center rounded-full hover:bg-primary-orange-400 hover:text-white',
          isSelect ? 'bg-primary-orange-400 text-white' : 'bg-none text-secondary-grey-900'
        )}
      >
        <User size={24} />
      </div>
    </HeaderDropdownMenu>
  );
};

export default UserOptionMenu;
