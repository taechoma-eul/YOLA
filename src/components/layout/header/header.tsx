import { getUserSessionState } from '@/lib/utils/api/auth.api';
import GuestOptionMenu from '@/components/layout/header/header-guest-option';
import HeaderNav from '@/components/layout/header/header-nav';
import MainLogo from '@/components/layout/header/header-main-logo';
import UserOptionMenu from '@/components/layout/header/header-user-option';

const Header = async () => {
  const { isLogin } = await getUserSessionState();

  return (
    <header className="fixed left-0 top-0 z-10 inline-flex h-24 w-full flex-col items-start justify-center gap-2.5 bg-white px-10 outline outline-1 outline-offset-[-1px] outline-gray-200">
      <div className="mx-auto flex h-[120px] w-full max-w-[1280px] items-center justify-between px-6">
        <div className="flex items-center justify-start gap-[60px]">
          <MainLogo />
          <HeaderNav />
        </div>
        {isLogin ? <UserOptionMenu /> : <GuestOptionMenu />}
      </div>
    </header>
  );
};

export default Header;
