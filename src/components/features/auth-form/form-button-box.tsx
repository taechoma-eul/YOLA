import Link from 'next/link';
import { login, signup } from '@/lib/utils/api/auth-action';
import { MODE } from '@/constants/auth-form';
import { PATH } from '@/constants/page-path';

const FormButton = ({ mode, isSubmitting }: { mode: string; isSubmitting: boolean }) => {
  if (mode === MODE.LOGIN)
    return (
      <div>
        <button formAction={login} type="submit" disabled={isSubmitting} className="w-full bg-gray-100 p-2">
          {isSubmitting ? '로그인 중..' : '로그인'}
        </button>
        <p className="mt-5 text-center">
          아직 회원이 아니신가요?{' '}
          <Link href={PATH.SIGNUP} className="text-blue-500">
            회원가입
          </Link>
        </p>
      </div>
    );

  if (mode === MODE.SIGNUP)
    return (
      <div>
        <button formAction={signup} type="submit" disabled={isSubmitting} className="w-full bg-gray-100 p-2">
          {isSubmitting ? '가입 중...' : '회원가입'}
        </button>
        <p className="mt-5 text-center">
          이미 계정이 있으신가요?{' '}
          <Link href={PATH.LOGIN} className="text-blue-500">
            로그인
          </Link>
        </p>
      </div>
    );
};

export default FormButton;
