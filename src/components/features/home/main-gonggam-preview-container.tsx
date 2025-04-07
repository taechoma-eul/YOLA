import { Children } from '@/types/children';

const GonggamPreviewContainer = ({ children }: Children) => {
  return <div className="flex w-[512px] flex-col items-center justify-start">{children}</div>;
};

export default GonggamPreviewContainer;
