'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { CustomButton } from '@/components/ui/custom-button';
import { API } from '@/constants/api-path';
import { GOOGLE_LOGIN, KAKAO_LOGIN } from '@/constants/default-image-url';
import { FAIL } from '@/constants/messages';
import { PATH } from '@/constants/page-path';
import { toastAlert } from '@/lib/utils/toast';
import type { AuthFormButtonProps } from '@/types/auth-form';
import { guestLogin } from '@/lib/utils/api/auth/auth-action';

const AuthFormButton = ({ isValid, isLoginPending }: AuthFormButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignInWithOAuth = (apiPath: string) => {
    startTransition(() => {
      try {
        router.push(apiPath);
      } catch {
        toastAlert(FAIL.SOCIAL_LOGIN, 'destructive');
      }
    });
  };

  const handleGuestLogin = async () => {
    await guestLogin();
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <CustomButton
          disabled={!isValid || isPending || isLoginPending}
          type="submit"
          size="auth-submit"
          className="h-[42px] w-full"
        >
          {!isPending && !isLoginPending ? '이메일로 로그인' : '로그인 중...'}
        </CustomButton>
        <CustomButton type="button" size="auth-submit" className="h-[42px] w-full" onClick={handleGuestLogin}>
          게스트로 로그인
        </CustomButton>
        <CustomButton asChild size="auth-submit" variant="outline" className="h-[42px] w-full">
          <Link href={PATH.SIGNUP}>회원가입</Link>
        </CustomButton>
      </div>
      <div className="relative mb-[21.5px] h-[50px] border-b border-t-0 border-secondary-grey-600 md:mb-[23px] md:h-[78px]">
        <p className="absolute left-[113px] top-[41px] justify-start bg-white px-[26px] text-sm font-normal leading-tight text-secondary-grey-600 md:left-[120px] md:top-[69px]">
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
