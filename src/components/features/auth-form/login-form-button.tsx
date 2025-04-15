'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toastAlert } from '@/lib/utils/toast';
import { CustomButton } from '@/components/ui/custom-button';
import type { AuthFormButtonProps } from '@/types/components/auth-form';
import { PATH } from '@/constants/page-path';
import { API } from '@/constants/api-path';
import { FAIL } from '@/constants/messages';
import { GOOGLE_LOGIN, KAKAO_LOGIN } from '@/constants/default-image-url';

const AuthFormButton = ({ isValid, isLoginPending }: AuthFormButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignInWithOAuth = (apiPath: string) => {
    startTransition(() => {
      try {
        router.push(apiPath);
      } catch (error) {
        toastAlert(FAIL.SOCIAL_LOGIN, 'destructive');
      }
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <CustomButton
          disabled={!isValid || isPending || isLoginPending}
          type="submit"
          size="auth-submit"
          className="h-[42px]"
        >
          {!isPending && !isLoginPending ? '이메일로 로그인' : '로그인 중...'}
        </CustomButton>
        <CustomButton asChild size="auth-submit" variant="outline" className="h-[42px]">
          <Link href={PATH.SIGNUP}>회원가입</Link>
        </CustomButton>
      </div>
      <div className="border-secondary-grey-600 relative mb-[23px] h-[78px] border-b border-t-0">
        <p className="text-secondary-grey-600 absolute left-[120px] top-[69px] justify-start bg-white px-[26px] text-sm font-normal leading-tight">
          간편 로그인
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => handleSignInWithOAuth(API.GOOGLE_LOGIN)}>
          <Image src={GOOGLE_LOGIN} alt="구글 로그인 버튼" width={50} height={50} />
        </button>
        <button type="button" onClick={() => handleSignInWithOAuth(API.KAKAO_LOGIN)}>
          <Image src={KAKAO_LOGIN} alt="카카오 로그인 버튼" width={50} height={50} />
        </button>
      </div>
    </>
  );
};

export default AuthFormButton;
