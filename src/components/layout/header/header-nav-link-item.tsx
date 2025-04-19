'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import NavLabel from '@/components/layout/header/header-nav-label';
import NavUnderBar from '@/components/layout/header/header-nav-under-bar';

const NavLinkItem = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const fullUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  const isSelect: boolean = fullUrl.includes(href);
  const isMission: boolean = fullUrl.includes('mission_id');

  return (
    <li className="flex h-[44px] w-[127px] flex-col items-center justify-center">
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <NavLabel label={label} isBold={isHovered || (isSelect && !isMission)} />
        <NavUnderBar isVisible={isHovered || (isSelect && !isMission)} />
      </Link>
    </li>
  );
};

export default NavLinkItem;
