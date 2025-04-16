import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import type { AuthFormButtonProps } from '@/types/components/auth-form';
import { PATH } from '@/constants/page-path';

const SignupFormButton = ({ isValid, isSignupPending }: AuthFormButtonProps) => {
  return (
    <div className="mt-[51px] flex flex-col gap-3">
      <CustomButton disabled={!isValid || isSignupPending} type="submit" size="auth-submit">
        {!isSignupPending ? '가입하기' : '회원등록 중...'}
      </CustomButton>
      <CustomButton asChild variant="outline" size="auth-submit" className="h-[42px]">
        <Link href={PATH.LOGIN}>뒤로가기</Link>
      </CustomButton>
    </div>
  );
};

export default SignupFormButton;
