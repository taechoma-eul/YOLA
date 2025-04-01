'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/utils/authValidate';
import AuthFormInput from '@/components/features/auth-form/auth-form-input';
import AuthFormContainer from '@/components/features/auth-form/auth-form-container';
import FormButton from '@/components/features/auth-form/form-button-box';
import type { AuthInputProps } from '@/types/components/auth-form';
import type { SignupFormData } from '@/lib/utils/authValidate';
import { MODE } from '@/constants/auth-form';

type FormData = Omit<AuthInputProps, 'register' | 'trigger' | 'getValues'>;

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
    trigger
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    },
    mode: 'onBlur'
  });

  const loginFormData: FormData[] = [
    {
      placeholder: '이메일 입력',
      type: 'email',
      name: 'email',
      errorMessage: errors.email?.message,
      label: '이메일'
    },
    {
      placeholder: '비밀번호 입력',
      type: 'password',
      name: 'password',
      checkButton: false,
      errorMessage: errors.password?.message,
      label: '비밀번호'
    }
  ];

  return (
    <AuthFormContainer>
      {loginFormData.map((data, index) => (
        <AuthFormInput
          key={index}
          register={register}
          trigger={trigger}
          getValues={getValues}
          placeholder={data.placeholder}
          type={data.type}
          name={data.name}
          checkButton={data.checkButton}
          errorMessage={data.errorMessage}
          label={data.label}
        />
      ))}
      <FormButton mode={MODE.LOGIN} isSubmitting={isSubmitting} />
    </AuthFormContainer>
  );
};

export default LoginForm;
