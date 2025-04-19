import { clsx } from 'clsx';
import Link from 'next/link';

interface MenuItem {
  label: string;
  href: string;
  isLine?: boolean;
  pathname?: string;
}

const HeaderDropdownMenuItem = ({ label, href, isLine = true, pathname }: MenuItem) => {
  const isSelect: boolean = decodeURIComponent(pathname!).includes(href);

  return (
    <>
      <Link
        href={href}
        className={clsx(
          'flex h-[47px] items-center justify-center bg-white hover:text-primary-orange-600',
          isSelect ? 'text-primary-orange-600' : 'text-secondary-grey-900'
        )}
      >
        {label}
      </Link>
      {isLine && <div className="m-0 h-[1px] w-[60px] bg-secondary-grey-300" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
