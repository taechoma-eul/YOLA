import GonggamHeader from '@/components/features/gonggam/gonggam-header';
import { TabsNav } from '@/components/features/gonggam/gonggam-tabs-nav';
import type { Children } from '@/types/children';

const GonggamLayout = ({ children }: Children) => {
  return (
    <div className="w-full p-8 pt-0">
      <GonggamHeader />
      <TabsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default GonggamLayout;
