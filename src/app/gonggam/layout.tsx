import { TabsNav } from '@/components/features/gonggam/gonggam-tabs-nav';

const GonggamLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <h1 className="mb-5 text-2xl font-extrabold">혼자 라이프 공감 게시판</h1>
      <TabsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default GonggamLayout;
