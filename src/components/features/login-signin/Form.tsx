import { login, signup } from '@/app/(auth)/login/action';
import FormInput from './FormInput';

const Form = () => {
  return (
    <form className="mx-auto my-10 flex w-96 flex-col gap-5">
      <FormInput label="이메일" name="email" inputType="email" />
      <FormInput label="비밀번호" name="password" inputType="password" />
      <FormInput label="닉네임" name="nickname" inputType="text" />
      <div className="flex justify-center gap-5">
        <button formAction={login}>로그인</button>
        <button formAction={signup}>회원가입</button>
      </div>
    </form>
  );
};

export default Form;
