import { Children } from '@/types/children';

const GonggamPreviewContainer = ({ children }: Children) => {
  return <div className="flex h-[256px] w-[512px] flex-col items-center justify-start">{children}</div>;
};

export default GonggamPreviewContainer;
