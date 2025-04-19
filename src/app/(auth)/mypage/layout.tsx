import MypageSideBar from '@/components/features/mypage/mypage-sidebar';
import type { Children } from '@/types/children';

const Layout = ({ children }: Children) => {
  return (
    <div className="flex w-full">
      <MypageSideBar />

      <section className="flex-1">{children}</section>
    </div>
  );
};

export default Layout;
