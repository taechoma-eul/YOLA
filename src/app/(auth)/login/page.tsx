import LoginForm from '@/components/features/auth-form/login-form';

const LoginPage = async () => {
  return (
    <div className="mx-auto w-[800px]">
      <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
