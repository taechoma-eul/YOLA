import AuthFormViewUi from '@/components/features/auth-form/auth-page-ui';
import { AUTH } from '@/constants/auth-form';

const SignUpPage = () => {
  return <AuthFormViewUi mode={AUTH.SIGNUP} />;
};

export default SignUpPage;
