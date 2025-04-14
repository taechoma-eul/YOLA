'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import ErrorBlock from '@/components/common/error-block';
import { PATH } from '@/constants/page-path';

const NotFoundPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBackHome = () => {
    startTransition(() => {
      router.push(PATH.HOME);
    });
  };

  return (
    <ErrorBlock
      errorImage={<Image src={'/images/not-found-image.svg'} alt="에러페이지" width={240} height={184} />}
      errorMessage="여기선 볼 수 있는 내용이 없어요."
    >
      <Button disabled={isPending} onClick={handleBackHome}>
        {isPending ? '이동 중...' : '홈으로 돌아가기'}
      </Button>
    </ErrorBlock>
  );
};

export default NotFoundPage;
