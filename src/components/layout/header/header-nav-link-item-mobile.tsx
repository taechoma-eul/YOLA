import Link from 'next/link';
import NavLabel from '@/components/layout/header/header-nav-label';
import { SheetClose } from '@/components/ui/sheet';

const NavMobileLinkItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className="w-full justify-start leading-snug hover:bg-primary-orange-200">
      <SheetClose asChild>
        <Link href={href} className="block px-5 py-4">
          <NavLabel label={label} isMobile />
        </Link>
      </SheetClose>
    </li>
  );
};

export default NavMobileLinkItem;
