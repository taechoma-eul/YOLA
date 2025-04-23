import Image from 'next/image';
import type { MissionWithStatus } from '@/types/checklist';
import DONE from '@images/images/checklist-done.svg';
import UNDO from '@images/images/checklist-undo.svg';

interface MissionCardProps {
  mission: MissionWithStatus;
  isCompleted: boolean;
}

const MissionCard = ({ mission, isCompleted }: MissionCardProps) => {
  return (
    <>
      <strong className="flex w-[221px] items-start gap-[10px] px-[20px] py-[20px] pb-0 pt-[20px]">
        <span className="flex-1 grow basis-0 text-[16px] font-semibold leading-[1.4] text-primary-orange-900">
          {mission.content}
        </span>
      </strong>
      <figure className="flex flex-1 items-center justify-center gap-[10px] self-stretch px-[10px]">
        <Image
          src={isCompleted ? DONE : UNDO}
          alt={isCompleted ? '완료' : '진행 전'}
          className="h-[93px] w-[93px] flex-shrink-0"
        />
      </figure>
      <div className="flex h-[45px] items-center justify-center gap-[10px] self-stretch rounded-b-[20px] bg-primary-orange-200">
        <span className="flex-1 grow basis-0 text-center text-[14px] leading-[1.4]">
          {isCompleted ? '인증글 보기' : '인증하기'}
        </span>
      </div>
    </>
  );
};

export default MissionCard;
