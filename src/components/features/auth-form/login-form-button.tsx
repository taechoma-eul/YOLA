import Link from 'next/link';
import { signInWithGoogle, signInWithKakao } from '@/lib/utils/api/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import { Button } from '@/components/ui/button';
import type { FieldData } from '@/types/components/auth-form';
import { PATH } from '@/constants/page-path';

const LoginFormButton = ({ isSubmitting }: Pick<FieldData, 'isSubmitting'>) => {
  const handleSignInWithOAuth = (signAction: () => Promise<never>) => {
    try {
      signAction();
    } catch (error) {
      toastAlert('소셜 로그인에 실패했습니다.', 'destructive');
    }
  };

  return (
    <>
      <div className="space-y-3 pt-3">
        <Button type="submit" className="h-[42px] w-full">
          {!isSubmitting ? '이메일로 로그인' : '로그인 중...'}
        </Button>
        <Button asChild className="h-[42px] w-full">
          <Link href={PATH.SIGNUP}>회원가입</Link>
        </Button>
      </div>
      <hr className="h-[30px] border-b border-t-0 border-gray-300" />
      <div className="flex gap-5">
        <Button type="submit" className="h-[42px] w-full" formAction={() => handleSignInWithOAuth(signInWithGoogle)}>
          구글
        </Button>
        <Button type="submit" className="h-[42px] w-full" formAction={() => handleSignInWithOAuth(signInWithKakao)}>
          카카오
        </Button>
      </div>
    </>
  );
};

export default LoginFormButton;
