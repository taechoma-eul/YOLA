import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { AuthFormButtonProps } from '@/types/components/auth-form';
import { PATH } from '@/constants/page-path';

const SignupFormButton = ({ isValid, isSignupPending }: AuthFormButtonProps) => {
  return (
    <div className="space-y-3 pt-3">
      <Button disabled={!isValid || isSignupPending} type="submit" className="h-[42px] w-full">
        {!isSignupPending ? '가입하기' : '회원등록 중...'}
      </Button>
      <Button asChild className="h-[42px] w-full">
        <Link href={PATH.LOGIN}>뒤로가기</Link>
      </Button>
    </div>
  );
};

export default SignupFormButton;
