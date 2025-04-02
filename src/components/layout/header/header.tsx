import Link from 'next/link';
import HeaderNav from './header-nav';
import { PATH } from '@/constants/page-path';
import { getUserMetadata } from '@/lib/utils/api/auth-action';
import GuestOptionMenu from './header-guest-option';
import UserOptionMenu from './header-user-option';

const Header = async () => {
  const user = await getUserMetadata();

  return (
    <header className="mx-auto w-[1200px]">
      <div className="flex h-[120px] items-center justify-between px-6">
        <div className="flex items-center justify-start gap-[65px]">
          <Link
            href={PATH.HOME}
            className="flex h-12 w-44 items-center justify-center bg-zinc-300 text-center text-3xl font-bold text-black"
          >
            YOLA
          </Link>
          <HeaderNav />
        </div>
        {user === null ? <GuestOptionMenu /> : <UserOptionMenu />}
      </div>
      <hr className="w-[1200px] outline-neutral-300" />
    </header>
  );
};

export default Header;
