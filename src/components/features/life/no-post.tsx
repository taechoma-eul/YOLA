'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import CAT_NO_RECORD from '@images/images/cat-no-records.svg';

const NoPost = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(PATH.LIFE_POST);
  };
  return (
    <div className="h-[350px] w-full flex-col items-center justify-center bg-secondary-grey-100 text-center">
      <Image src={CAT_NO_RECORD} alt="기록 없는 고양이" className="mx-auto mb-[20px] pt-[80px]" />
      <div className="text-secondary-grey-600">앗! 이날의 기록이 없어요</div>
      <div className="mb-[30px] text-secondary-grey-600">혼자만의 하루에 대한 기록을 남겨보세요!</div>

      <CustomButton onClick={handleClick}>일기 작성하기</CustomButton>
    </div>
  );
};

export default NoPost;
// Compare this snippet from src/components/features/life/solo-life-list.tsx:
