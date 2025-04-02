import SignupForm from '@/components/features/auth-form/signup-form';

export default function SignUpPage() {
  return (
    <div className="mx-auto w-[800px]">
      <h1 className="mb-6 text-center text-2xl font-bold">회원가입</h1>
      <SignupForm />
    </div>
  );
}
