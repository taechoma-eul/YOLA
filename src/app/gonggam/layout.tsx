import { TabsNav } from '@/components/features/gonggam/gonggam-tabs-nav';

const GonggamLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <TabsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default GonggamLayout;
