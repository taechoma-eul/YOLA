import GonggamHeader from '@/components/features/gonggam/gonggam-header';
import { TabsNav } from '@/components/features/gonggam/gonggam-tabs-nav';

const GonggamLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-8 pt-0">
      <GonggamHeader />
      <TabsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default GonggamLayout;
