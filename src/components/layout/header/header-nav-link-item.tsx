'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { Children } from '@/types/children';

const NavLinkItem = ({ href, children }: Children & { href: string }) => {
  const pathName = usePathname();

  const isSelectNav: boolean = pathName.includes(href);

  return (
    <Link href={href} data-state="Default" className="inline-flex h-11 items-center justify-center gap-2.5">
      <p className={clsx('w-32 justify-start text-center text-lg', isSelectNav ? 'text-[#DC6803]' : 'text-zinc-80')}>
        {children}
      </p>
    </Link>
  );
};

export default NavLinkItem;
