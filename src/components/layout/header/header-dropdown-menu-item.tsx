'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/utils/api/auth-action';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import type { MenuItem } from '@/types/components/header';

const HeaderDropdownMenuItem = ({ path, label, href, isLine = true, isButton = false }: MenuItem) => {
  const queryClient = useQueryClient();
  const pathName: string = usePathname();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await logout();
      queryClient.clear();
    } catch (error) {}
  };
  return (
    <>
      <DropdownMenuItem
        className={clsx(
          'justify-center px-3.5 py-4 text-base font-normal leading-snug focus:bg-white focus:text-[#DC6803]',
          path === pathName ? 'text-[#DC6803]' : 'text-zinc-80'
        )}
      >
        {isButton ? <button onClick={handleLogout}>{label}</button> : <Link href={href}>{label}</Link>}
      </DropdownMenuItem>
      {isLine && <DropdownMenuSeparator className="m-0 w-[60px] bg-gray-300" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
