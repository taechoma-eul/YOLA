import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import type { AuthFormButtonProps } from '@/types/auth-form';

const SignupFormButton = ({ isValid, isSignupPending }: AuthFormButtonProps) => {
  return (
    <div className="mt-[53px] flex flex-col gap-3">
      <CustomButton disabled={!isValid || isSignupPending} type="submit" size="auth-submit" className="w-full">
        {!isSignupPending ? '가입하기' : '회원등록 중...'}
      </CustomButton>
      <CustomButton asChild variant="outline" size="auth-submit" className="h-[42px] w-full">
        <Link href={PATH.LOGIN}>뒤로가기</Link>
      </CustomButton>
    </div>
  );
};

export default SignupFormButton;
