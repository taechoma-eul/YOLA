'use client';

import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import Link from 'next/link';
import { FAIL } from '@/constants/messages';
import { logout } from '@/lib/utils/api/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import type { MenuItem } from '@/types/header';

const HeaderDropdownMenuItem = ({ label, href, isLine = true, isButton = false, pathname }: MenuItem) => {
  const queryClient = useQueryClient();

  const isSelect: boolean = decodeURIComponent(pathname!).includes(href);

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
    } catch {
      toastAlert(FAIL.LOGOUT, 'default');
      return;
    }
  };

  return (
    <>
      <div
        className={clsx(
          'flex h-[47px] items-center justify-center bg-white hover:text-primary-orange-600',
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
      {isLine && <div className="m-0 h-[1px] w-[60px] bg-secondary-grey-300" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
