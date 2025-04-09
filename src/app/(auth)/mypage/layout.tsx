import { Children } from '@/types/children';
import MypageSideBar from '@/components/features/mypage/mypage-sidebar';

const Layout = ({ children }: Children) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* 좌측 사이드바 (모바일에서는 상단) */}
      <MypageSideBar />

      {/* 우측 콘텐츠 (모바일에서는 아래) */}
      <main className="flex-1 p-5 md:ml-60">{children}</main>
    </div>
  );
};

export default Layout;
