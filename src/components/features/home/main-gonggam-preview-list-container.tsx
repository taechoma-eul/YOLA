import { Children } from '@/types/children';

const ListContainer = ({ children }: Children) => {
  return <div className="inline-flex flex-col items-start justify-start gap-2.5 self-stretch">{children}</div>;
};

export default ListContainer;
