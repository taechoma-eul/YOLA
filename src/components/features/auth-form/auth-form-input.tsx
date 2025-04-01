import { InputProps } from '@/types/components/auth-form';

const AuthFormInput = ({ label, name, inputType, button }: InputProps) => {
  return (
    <div className="flex gap-7">
      <p className="flex w-[120px] items-center justify-end">{label}</p>
      <input id={name} name={name} type={inputType} required className="h-10 w-[500px] border-2" />
      {button && <button className="w-[100px]">중복확인</button>}
    </div>
  );
};

export default AuthFormInput;
