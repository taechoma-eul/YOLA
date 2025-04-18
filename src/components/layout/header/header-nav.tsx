import NavChallengeMenu from '@/components/layout/header/header-nav-challenge-menu';
import NavLinkItem from '@/components/layout/header/header-nav-link-item';
import { PATH } from '@/constants/page-path';

interface NavList {
  href: string;
  label: string;
}

const HeaderNav = () => {
  const navList: NavList[] = [
    { href: PATH.LIFE, label: '혼자라이프 달력' },
    { href: PATH.GONGGAM, label: '공감 게시판' }
  ];

  return (
    <nav className="flex items-center justify-center gap-1">
      <NavLinkItem label="혼자라이프 달력" href={PATH.LIFE} />
      <NavLinkItem label="공감 게시판" href={PATH.GONGGAM} />
      <NavChallengeMenu label="챌린지" />
    </nav>
  );
};

export default HeaderNav;
