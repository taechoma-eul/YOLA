import { User } from 'lucide-react';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const UserOptionMenu = () => {
  const userMenuItem: MenuItem[] = [
    { href: PATH.MYPAGE, label: '마이페이지', path: PATH.MYPAGE },
    { href: '', label: '로그아웃', isLine: false, isButton: true }
  ];
  return (
    <HeaderDropdownMenu menuItems={userMenuItem} align="end">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-300">
        <User color="#ffffff" />
      </div>
    </HeaderDropdownMenu>
  );
};

export default UserOptionMenu;
