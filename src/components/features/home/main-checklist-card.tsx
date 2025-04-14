import Link from 'next/link';
import Image from 'next/image';
import { PATH } from '@/constants/page-path';

const CheckListCard = ({ checkListType }: { checkListType: string }) => {
  return (
    <Link
      href={`${PATH.CHECKLIST}/${checkListType}`}
      className="relative h-56 w-56 overflow-hidden rounded-[30px] bg-white outline outline-1 outline-gray-300"
    >
      <p className="absolute left-[16px] top-[19px] w-[70px] justify-start leading-snug text-zinc-800">
        {checkListType} <br /> 체크리스트
      </p>
      <div className="absolute left-0 top-[79px] h-36 w-56 overflow-hidden bg-gray-50">
        <Image
          src={`/images/${checkListType}.svg`}
          alt={`${checkListType} 체크리스트 이미지`}
          width={221}
          height={142}
          priority
        />
      </div>
    </Link>
  );
};

export default CheckListCard;
