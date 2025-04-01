import { login, signup } from '@/app/(auth)/login/action';
import { FormData } from '@/types/components/auth-form';
import AuthFormInput from './auth-form-input';
import { MODE } from '@/constants/auth-form';

const AuthForm = ({ formData, mode }: FormData) => {
  return (
    <form className="mx-auto my-10 flex w-[700px] flex-col gap-5">
      {formData.map((data) => (
        <AuthFormInput label={data.label} name={data.name} inputType={data.inputType} button={data.button} />
      ))}
      <div className="flex justify-center gap-5">
        {mode === MODE.LOGIN && <button formAction={login}>로그인</button>}
        {mode === MODE.SIGNUP && <button formAction={signup}>회원가입</button>}
      </div>
    </form>
  );
};

export default AuthForm;
