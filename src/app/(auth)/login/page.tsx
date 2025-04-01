import AuthForm from '@/components/features/auth-form/auth-form';
import { MODE } from '@/constants/auth-form';

const LoginPage = async () => {
  const loginFormData = [
    { label: '이메일', name: 'email', inputType: 'email' },
    { label: '비밀번호', name: 'password', inputType: 'password' }
  ];
  return <AuthForm mode={MODE.LOGIN} formData={loginFormData} />;
};

export default LoginPage;
