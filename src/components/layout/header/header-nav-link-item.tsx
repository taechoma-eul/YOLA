'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Children } from '@/types/children';

const NavLinkItem = ({ href, children }: Children & { href: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  const isSelect: boolean = fullUrl.includes(href);
  const isMission: boolean = fullUrl.includes('mission_id');

  return (
    <Link href={href} data-state="Default" className="inline-flex h-11 items-center justify-center gap-2.5">
      <p
        className={clsx(
          'w-32 justify-start text-center text-lg',
          isSelect && !isMission ? 'text-[#DC6803]' : 'text-zinc-80'
        )}
      >
        {children}
      </p>
    </Link>
  );
};

export default NavLinkItem;
