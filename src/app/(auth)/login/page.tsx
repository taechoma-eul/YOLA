import AuthContent from '@/components/features/auth-form/auth-content';
import LoginForm from '@/components/features/auth-form/login-form';
import { AUTH } from '@/constants/auth-form';

const LoginPage = async () => {
  return <AuthContent title={AUTH.LOGIN} form={<LoginForm />} />;
};

export default LoginPage;
