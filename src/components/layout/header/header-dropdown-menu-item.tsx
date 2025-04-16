'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/utils/api/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import type { MenuItem } from '@/types/components/header';
import { FAIL } from '@/constants/messages';

const HeaderDropdownMenuItem = ({ label, href, isLine = true, isButton = false, pathname }: MenuItem) => {
  const queryClient = useQueryClient();

  const isSelect: boolean = decodeURIComponent(pathname!).includes(href);

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
    } catch (error) {
      toastAlert(FAIL.LOGOUT, 'default');
      return;
    }
  };

  return (
    <>
      <div
        className={clsx(
          'hover:text-primary-orange-600 flex h-[47px] items-center justify-center bg-white',
          isSelect && href !== '' ? 'text-primary-orange-600' : 'text-secondary-grey-900'
        )}
      >
        {isButton ? (
          <button className="text-secondary-grey-900 hover:text-primary-orange-600" onClick={handleLogout}>
            {label}
          </button>
        ) : (
          <Link href={href}>{label}</Link>
        )}
      </div>
      {isLine && <div className="bg-secondary-grey-300 m-0 h-[1px] w-[60px]" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
