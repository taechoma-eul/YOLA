import NavChallengeMenu from '@/components/layout/header/header-nav-challenge-menu';
import NavLinkItem from '@/components/layout/header/header-nav-link-item';
import { PATH } from '@/constants/page-path';

const HeaderNav = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-[4px]">
        <NavLinkItem label="혼자라이프 달력" href={PATH.LIFE} />
        <NavLinkItem label="공감 게시판" href={PATH.GONGGAM} />
        <NavChallengeMenu />
      </ul>
    </nav>
  );
};

export default HeaderNav;
