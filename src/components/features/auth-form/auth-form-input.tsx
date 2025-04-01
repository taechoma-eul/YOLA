import type { AuthInputProps } from '@/types/components/auth-form';

const AuthFormInput = ({
  register,
  trigger,
  placeholder,
  type,
  name,
  checkButton,
  errorMessage,
  label
}: AuthInputProps) => {
  return (
    <div className="relative grid grid-cols-3 items-center gap-4">
      <label htmlFor={name} className="text-right">
        {label}
      </label>
      <input
        {...register(name, { onBlur: () => trigger(name) })}
        id={name}
        type={type}
        className="h-10 w-full border-2 p-2"
        placeholder={placeholder}
      />
      {/* 레이아웃 시프트 때문에 일단 빈 버튼을 넣었습니다. 스타일적인 문제라 디자인 입힐 때 수정 예정입니다! */}
      {checkButton ? (
        <button type="button" className="w-[100px] bg-gray-100 p-2">
          중복확인
        </button>
      ) : (
        <button></button>
      )}
      {errorMessage && <p className="absolute left-[280px] top-[45px] text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default AuthFormInput;
