import Link from 'next/link';
import NavText from '@/components/layout/header/header-nav-item-text';
import type { Children } from '@/types/children';

const NavLinkItem = ({ href, children }: Children & { href: string }) => {
  return (
    <Link href={href} data-state="Default" className="inline-flex h-11 items-center justify-center gap-2.5">
      <NavText>{children}</NavText>
    </Link>
  );
};

export default NavLinkItem;
