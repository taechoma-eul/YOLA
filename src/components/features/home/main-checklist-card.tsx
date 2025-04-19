import Image from 'next/image';
import Link from 'next/link';
import { PATH } from '@/constants/page-path';

const CheckListCard = ({ checkListType }: { checkListType: string }) => {
  return (
    <Link
      href={`${PATH.CHECKLIST}/${checkListType}`}
      className="relative h-[221px] w-[221px] overflow-hidden rounded-[30px] bg-white outline outline-1 outline-secondary-grey-300"
    >
      <p className="absolute left-[16px] top-[19px] justify-start leading-snug text-secondary-grey-900">
        {checkListType} <br /> 체크리스트
      </p>
      <div className="absolute left-0 top-[79px] h-36 w-56 overflow-hidden">
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
