import NavLinkItem from '@/components/layout/header/header-nav-link-item';
import NavChallengeMenu from '@/components/layout/header/header-nav-challenge-menu';
import { PATH } from '@/constants/page-path';

interface NavList {
  href: string;
  label: string;
}

const HeaderNav = () => {
  const navList: NavList[] = [
    { href: PATH.LIFE, label: '혼자라이프 달력' },
    { href: PATH.GONGGAM, label: '공감게시판' }
  ];

  return (
    <nav className="flex items-center justify-center gap-1">
      {navList.map((item) => (
        <NavLinkItem key={item.label} href={item.href} children={item.label} />
      ))}
      <NavChallengeMenu />
    </nav>
  );
};

export default HeaderNav;
