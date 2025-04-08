import AuthFormViewUi from '@/components/features/auth-form/auth-page-ui';
import { AUTH } from '@/constants/auth-form';

const LoginPage = async () => {
  return <AuthFormViewUi mode={AUTH.LOGIN} />;
};

export default LoginPage;
