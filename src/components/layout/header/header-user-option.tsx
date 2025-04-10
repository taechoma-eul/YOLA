'use client';

import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { User } from 'lucide-react';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import HeaderDropdownMenu from '@/components/layout/header/header-dropdown-menu';
import type { MenuItem } from '@/types/components/header';
import { PATH } from '@/constants/page-path';
import { QUERY_KEY } from '@/constants/query-keys';

const UserOptionMenu = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // 마우스 호버 시 프리패칭
    queryClient.prefetchQuery({
      queryKey: QUERY_KEY.PROFILE,
      queryFn: getUserProfile
    });
  };

  const isSelect: boolean = pathname.includes(PATH.MYPAGE);

  const userMenuItem: MenuItem[] = [
    { href: PATH.MYPAGE, label: '마이페이지' },
    { href: '', label: '로그아웃', isLine: false, isButton: true }
  ];
  return (
    <HeaderDropdownMenu menuItems={userMenuItem} isUserMenu>
      <div
        onMouseEnter={handleMouseEnter}
        className={clsx(
          'flex size-[36px] items-center justify-center rounded-full hover:bg-amber-300',
          isSelect ? 'bg-amber-300' : 'bg-none'
        )}
      >
        <User size={24} color="#2E3135" />
      </div>
    </HeaderDropdownMenu>
  );
};

export default UserOptionMenu;
