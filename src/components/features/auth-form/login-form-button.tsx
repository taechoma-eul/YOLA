'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toastAlert } from '@/lib/utils/toast';
import { Button } from '@/components/ui/button';
import type { FieldData } from '@/types/components/auth-form';
import { PATH } from '@/constants/page-path';
import { API } from '@/constants/api-path';
import { useTransition } from 'react';

const LoginFormButton = ({ isSubmitting }: Pick<FieldData, 'isSubmitting'>) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignInWithOAuth = (apiPath: string) => {
    startTransition(() => {
      try {
        router.push(apiPath);
      } catch (error) {
        toastAlert('소셜 로그인에 실패했습니다.', 'destructive');
      }
    });
  };
  console.log('isPending', isPending);
  return (
    <>
      <div className="space-y-3 pt-3">
        <Button disabled={isSubmitting || isPending ? true : false} type="submit" className="h-[42px] w-full">
          {isSubmitting || !isPending ? '이메일로 로그인' : '로그인 중...'}
        </Button>
        <Button asChild className="h-[42px] w-full">
          <Link href={PATH.SIGNUP}>회원가입</Link>
        </Button>
      </div>
      <hr className="h-[30px] border-b border-t-0 border-gray-300" />
      <div className="flex gap-5">
        <Button type="button" className="h-[42px] w-full" onClick={() => handleSignInWithOAuth(API.GOOGLE_LOGIN)}>
          구글
        </Button>
        <Button type="button" className="h-[42px] w-full" onClick={() => handleSignInWithOAuth(API.KAKAO_LOGIN)}>
          카카오
        </Button>
      </div>
    </>
  );
};

export default LoginFormButton;
