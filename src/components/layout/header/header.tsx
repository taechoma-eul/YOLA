import GuestOptionMenu from '@/components/layout/header/header-guest-option';
import MainLogo from '@/components/layout/header/header-main-logo';
import HeaderNav from '@/components/layout/header/header-nav';
import UserOptionMenu from '@/components/layout/header/header-user-option';
import { getUserSessionState } from '@/lib/utils/api/auth.api';

const Header = async () => {
  const { isLogin } = await getUserSessionState();

  return (
    <header className="fixed left-0 top-0 z-10 inline-flex h-[100px] w-full flex-col items-start justify-center gap-2.5 bg-white px-10 outline outline-1 outline-offset-[-1px] outline-secondary-grey-200">
      <div className="mx-auto flex h-[120px] w-full max-w-[1280px] items-center justify-between">
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
