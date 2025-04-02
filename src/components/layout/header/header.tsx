import Link from 'next/link';
import { getUserMetadata } from '@/lib/utils/api/auth-action';
import GuestOptionMenu from '@/components/layout/header/header-guest-option';
import HeaderNav from '@/components/layout/header/header-nav';
import UserOptionMenu from '@/components/layout/header/header-user-option';
import { PATH } from '@/constants/page-path';

const Header = async () => {
  const user = await getUserMetadata();

  return (
    <header className="fixed left-0 top-0 z-50 mx-auto w-full bg-white">
      <div className="mx-auto flex h-[120px] w-[1200px] items-center justify-between px-6">
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
      <hr className="mx-auto w-[1200px] outline-neutral-300" />
    </header>
  );
};

export default Header;
