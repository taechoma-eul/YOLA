import { Children } from '@/types/children';

const ItemContainer = ({ children }: Children) => {
  return (
    <div className="inline-flex items-end justify-between self-stretch border-b border-stone-300 py-4">{children}</div>
  );
};

export default ItemContainer;
