import type { Children } from '@/types/children';

const RandomMissionContainer = ({ children }: Children) => {
  return <div className="relative inline-flex w-full max-w-[516px] items-start justify-between pb-4">{children}</div>;
};

export default RandomMissionContainer;
