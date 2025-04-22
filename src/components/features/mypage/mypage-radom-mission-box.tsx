import Image from 'next/image';
import ButtonClientComponent from '@/components/features/mypage/button-client-component';
import CAT_IN_QUESTION_BOX from '@images/images/cat-in-question-box.svg';
import type { TableMissionList } from '@/types/supabase-const';

interface RandomMissionBoxProps {
  missionsData: TableMissionList[];
  isLogin: boolean;
}

const RandomMissionBox = ({ missionsData, isLogin }: RandomMissionBoxProps) => {
  return (
    <div className="relative mb-[96px] flex min-h-[178px] w-full flex-row justify-between rounded-[8px] border-none bg-mypage-peach pl-[28px] pr-[96px] pt-[27px] text-sm leading-tight text-secondary-grey-900">
      {/* 왼쪽 텍스트 & 버튼 */}
      <div className="flex max-w-[70%] flex-col justify-start">
        <p className="mt-[27px] text-base font-normal leading-snug text-secondary-grey-900">
          혼자서 보내는 시간이 지루하게 느껴질 때,
        </p>
        <p className="text-base font-normal leading-snug text-secondary-grey-900">
          다양한 주제의 <span className="font-semibold">랜덤 미션</span>을 통해 매일 색다른 하루를 만들어보세요.
        </p>
        <ButtonClientComponent missionsData={missionsData} isLogin={isLogin} />
      </div>

      {/* 오른쪽 고양이 이미지 */}
      <aside className="flex shrink-0 items-end">
        <Image
          src={CAT_IN_QUESTION_BOX}
          alt="?가 그려진 박스 안에 들어가 있는 고양이 일러스트"
          height={164}
          width={139}
        />
      </aside>
    </div>
  );
};

export default RandomMissionBox;
