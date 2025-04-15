import Link from 'next/link';
import type { Children } from '@/types/children';
import { PATH } from '@/constants/page-path';

interface ContainerProps extends Children {
  postId: number;
  category: string;
}

const ItemContainer = ({ children, postId, category }: ContainerProps) => {
  return (
    <Link
      href={`${PATH.GONGGAM}/${category}/${postId}`}
      className="inline-flex h-[67px] items-end justify-between self-stretch border-b border-stone-300 py-3"
    >
      {children}
    </Link>
  );
};

export default ItemContainer;
