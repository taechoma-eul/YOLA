import { User } from 'lucide-react';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';

const UserOptionMenu = () => {
  const userMenuItem: MenuItem[] = [
    { href: PATH.MYPAGE, label: '마이페이지', path: PATH.MYPAGE },
    { href: '', label: '로그아웃', isLine: false, isButton: true, path: '' }
  ];
  return (
    <HeaderDropdownMenu menuItems={userMenuItem} align="end">
      <User color="#2E3135" size={24} />
    </HeaderDropdownMenu>
  );
};

export default UserOptionMenu;
