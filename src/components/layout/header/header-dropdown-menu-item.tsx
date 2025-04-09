'use client';

import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/utils/api/auth-action';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import type { MenuItem } from '@/types/components/header';

const HeaderDropdownMenuItem = ({ path, label, isLine = true, isButton = false }: MenuItem) => {
  const queryClient = useQueryClient();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await logout();
      queryClient.clear();
    } catch (error) {}
  };
  return (
    <>
      <DropdownMenuItem className="text-md w-24 justify-center font-normal text-black hover:bg-gray-100">
        {isButton ? <button onClick={handleLogout}>{label}</button> : <Link href={path}>{label}</Link>}
      </DropdownMenuItem>
      {isLine && <DropdownMenuSeparator className="w-24 bg-neutral-200" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
