import AuthForm from '@/components/features/auth-form/auth-form';
import { MODE } from '@/constants/auth-form';

export default function SignUpPage() {
  return (
    <div className="mx-auto w-[800px]">
      <h1 className="mb-6 text-center text-2xl font-bold">회원가입</h1>
      <AuthForm mode={MODE.SIGNUP} />
    </div>
  );
}
