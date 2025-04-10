import { AuthFormMode } from '@/types/components/auth-form';
import AuthForm from '@/components/features/auth-form/auth-form';
import { AUTH } from '@/constants/auth-form';

const AuthPage = ({ mode }: AuthFormMode) => {
  return (
    <div className="w-full justify-items-center">
      <h1 className="mb-4 text-center text-2xl font-bold">{mode === AUTH.LOGIN ? '로그인' : '회원가입'}</h1>
      <AuthForm mode={mode} />
    </div>
  );
};

export default AuthPage;
