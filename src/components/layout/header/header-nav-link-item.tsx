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
    <Link href={href} data-state="Default" className="group inline-flex h-11 flex-col items-center justify-center">
      <div className="flex w-32 flex-col items-center">
        <div
          className={clsx(
            'text-zinc-80 relative h-full justify-start text-center text-lg group-hover:font-semibold',
            isSelect && !isMission ? 'font-semibold' : 'font-normal'
          )}
        >
          {children}
          <div
            className={clsx(
              'absolute h-0.5 w-full self-stretch rounded-[1px] bg-amber-500 group-hover:visible',
              isSelect && !isMission ? 'visible' : 'invisible'
            )}
          />
        </div>
      </div>
    </Link>
  );
};

export default NavLinkItem;
