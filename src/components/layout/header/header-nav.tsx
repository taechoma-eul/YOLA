'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import GuestOptionMenu from '@/components/layout/header/header-guest-option';
import NavChallengeMenu from '@/components/layout/header/header-nav-challenge-menu';
import NavLinkItem from '@/components/layout/header/header-nav-link-item';
import UserOptionMenu from '@/components/layout/header/header-user-option';
import { PATH } from '@/constants/page-path';
import MainLogo from './header-main-logo';
import HeaderMobileMenu from './header-nav-menu-mobile';

const HeaderNav = ({ isLogin }: { isLogin: boolean }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
  const isMission: boolean = fullUrl.includes('mission_id');

  return (
    <nav className="relative flex w-full justify-between">
      <HeaderMobileMenu />
      <MainLogo />
      <ul className="left-[164px] hidden items-center justify-center gap-[4px] md:absolute md:flex">
        <NavLinkItem label="혼자라이프 달력" href={PATH.LIFE} fullUrl={fullUrl} isMission={isMission} />
        <NavLinkItem label="공감 게시판" href={PATH.GONGGAM} fullUrl={fullUrl} isMission={isMission} />
        <NavChallengeMenu fullUrl={fullUrl} isMission={isMission} />
      </ul>
      {isLogin ? <UserOptionMenu pathname={pathname} /> : <GuestOptionMenu />}
    </nav>
  );
};

export default HeaderNav;
