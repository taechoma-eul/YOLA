import AuthFormViewUi from '@/components/features/auth-form/auth-page-ui';
import { MODE } from '@/constants/auth-form';

const SignUpPage = () => {
  return <AuthFormViewUi mode={MODE.SIGNUP} />;
};

export default SignUpPage;
