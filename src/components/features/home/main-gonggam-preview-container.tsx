import type { Children } from '@/types/children';

const GonggamPreviewContainer = ({ children }: Children) => {
  return <div className="flex w-[578px] flex-col items-center justify-start gap-[16px]">{children}</div>;
};

export default GonggamPreviewContainer;
