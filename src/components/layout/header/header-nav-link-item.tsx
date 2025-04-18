'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const NavLinkItem = ({ href, label }: { href: string; label: string }) => {
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
            'relative h-[25px] justify-start text-center text-lg text-secondary-grey-900 group-hover:font-semibold',
            isSelect && !isMission ? 'font-semibold' : 'font-normal'
          )}
        >
          {label}
          <div
            className={clsx(
              'absolute top-[25px] h-[2px] w-full self-stretch rounded-[1px] bg-primary-orange-500 group-hover:visible',
              isSelect && !isMission ? 'visible' : 'invisible'
            )}
          />
        </div>
      </div>
    </Link>
  );
};

export default NavLinkItem;
