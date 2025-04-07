import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import type { Children } from '@/types/children';

const ItemContainer = ({ children, postId }: Children & { postId: number }) => {
  return (
    <Link
      href={`${PATH.GONGGAM}/${postId}`}
      className="inline-flex items-end justify-between self-stretch border-b border-stone-300 py-4"
    >
      {children}
    </Link>
  );
};

export default ItemContainer;
