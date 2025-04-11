import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import type { Children } from '@/types/children';

interface ContainerProps extends Children {
  postId: number;
  category: string;
}

const MypageItemContainer = ({ children, postId, category }: ContainerProps) => {
  return (
    <Link
      href={`${PATH.GONGGAM}/${category}/${postId}`}
      className="flex flex-col items-end justify-between self-stretch rounded-md border border-stone-300 p-4"
    >
      {children}
    </Link>
  );
};

export default MypageItemContainer;
