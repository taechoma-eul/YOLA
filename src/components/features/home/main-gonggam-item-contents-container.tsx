import { Children } from '@/types/children';

const ContentsContainer = ({ children }: Children) => {
  return <div className="flex flex-col items-start justify-start gap-1 self-stretch">{children}</div>;
};

export default ContentsContainer;
