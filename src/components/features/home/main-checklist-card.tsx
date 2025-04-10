import Link from 'next/link';
import { Image } from 'lucide-react';
import { PATH } from '@/constants/page-path';

const CheckListCard = ({ checkListType }: { checkListType: string }) => {
  return (
    <Link
      href={`${PATH.CHECKLIST}/${checkListType}`}
      className="relative h-56 w-56 overflow-hidden rounded bg-white outline outline-1 outline-offset-[-1px] outline-stone-300"
    >
      <p>{checkListType}</p>
      <p>체크리스트</p>
      <div className="absolute left-0 top-[79px] h-36 w-56 overflow-hidden bg-neutral-200">
        <Image className="absolute left-24 top-16" />
        <div className="absolute left-[103px] top-[63px] h-4 w-4 overflow-hidden"></div>
      </div>
    </Link>
  );
};

export default CheckListCard;
