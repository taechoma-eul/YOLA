import { User } from 'lucide-react';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const UserOptionMenu = () => {
  const userMenuItem: MenuItem[] = [
    { href: PATH.MYPAGE, label: '마이페이지' },
    { href: '', label: '로그아웃', isLine: false, isButton: true }
  ];
  return (
    <HeaderDropdownMenu menuItems={userMenuItem}>
      <User color="#2E3135" size={24} />
    </HeaderDropdownMenu>
  );
};

export default UserOptionMenu;
