'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/utils/api/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import type { MenuItem } from '@/types/components/header';
import { FAIL_LOGOUT } from '@/constants/messages';

const HeaderDropdownMenuItem = ({ label, href, isLine = true, isButton = false, pathname }: MenuItem) => {
  const queryClient = useQueryClient();

  const isSelect: boolean = decodeURIComponent(pathname!).includes(href);

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
    } catch (error) {
      toastAlert(FAIL_LOGOUT, 'default');
      return;
    }
  };

  return (
    <>
      <div
        className={clsx(
          'flex h-[47px] items-center justify-center bg-white hover:text-[#DC6803]',
          isSelect && href !== '' ? 'text-[#DC6803]' : 'text-zinc-80'
        )}
      >
        {isButton ? (
          <button className="text-zinc-80" onClick={handleLogout}>
            {label}
          </button>
        ) : (
          <Link href={href}>{label}</Link>
        )}
      </div>
      {isLine && <div className="m-0 h-px w-[60px] bg-gray-300" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
