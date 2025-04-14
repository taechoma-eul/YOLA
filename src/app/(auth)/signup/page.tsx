import AuthContent from '@/components/features/auth-form/auth-content';
import SignupForm from '@/components/features/auth-form/signup-form';
import { AUTH } from '@/constants/auth-form';

const SignUpPage = () => {
  return <AuthContent title={AUTH.LOGIN} form={<SignupForm />} />;
};

export default SignUpPage;
