import type { Children } from '@/types/children';

const RandomMissionContainer = ({ children }: Children) => {
  return <div className="inline-flex items-start justify-start gap-[68px]">{children}</div>;
};

export default RandomMissionContainer;
