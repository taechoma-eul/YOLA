import HeaderNav from '@/components/layout/header/header-nav';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';

const Header = async () => {
  const { isLogin } = await getUserSessionState();

  return (
    <header className="fixed left-0 top-0 z-10 inline-flex h-[60px] w-full flex-col justify-center bg-white px-4 outline outline-1 outline-offset-[-1px] outline-secondary-grey-200 md:h-[100px] md:px-10">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
        <HeaderNav isLogin={isLogin} />
      </div>
    </header>
  );
};

export default Header;
