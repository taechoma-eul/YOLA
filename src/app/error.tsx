'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import ErrorBlock from '@/components/common/error-block';
import { PATH } from '@/constants/page-path';

export default function ErrorPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBackHome = () => {
    startTransition(() => {
      router.push(PATH.HOME);
    });
  };

  return (
    <ErrorBlock
      errorImage={<Image src={'/images/error-image.svg'} alt="에러페이지" width={240} height={184} />}
      errorMessage="이런!! 오류가 발생했어요."
    >
      <Button value="default" size="error-page" onClick={handleBackHome} disabled={isPending}>
        {isPending ? '이동 중...' : '홈으로 돌아가기'}
      </Button>
    </ErrorBlock>
  );
}
