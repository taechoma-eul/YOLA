import { Children } from '@/types/children';
import MypageSideBar from '@/components/features/mypage/mypage-sidebar';

const Layout = ({ children }: Children) => {
  return (
    <div className="flex w-full">
      <MypageSideBar />

      <section className="flex-1">{children}</section>
    </div>
  );
};

export default Layout;
