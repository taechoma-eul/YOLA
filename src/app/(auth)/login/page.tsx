import AuthForm from '@/components/features/auth-form/auth-form';
import { MODE } from '@/constants/auth-form';

const LoginPage = async () => {
  return (
    <div className="mx-auto w-[800px]">
      <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>
      <AuthForm mode={MODE.LOGIN} />
    </div>
  );
};

export default LoginPage;
