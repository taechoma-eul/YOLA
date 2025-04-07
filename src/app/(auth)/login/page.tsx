import AuthFormViewUi from '@/components/features/auth-form/auth-page-ui';
import { MODE } from '@/constants/auth-form';

const LoginPage = async () => {
  return <AuthFormViewUi mode={MODE.LOGIN} />;
};

export default LoginPage;
