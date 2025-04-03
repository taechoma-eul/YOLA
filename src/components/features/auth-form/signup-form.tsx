'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validation/authValidate';
import AuthFormContainer from '@/components/features/auth-form/auth-form-container';
import AuthFormInput from '@/components/features/auth-form/auth-form-input';
import FormButton from '@/components/features/auth-form/form-button-box';
import type { AuthInputProps } from '@/types/components/auth-form';
import type { SignupFormData } from '@/validation/authValidate';
import { AUTH } from '@/constants/auth-form';

type FormData = Omit<AuthInputProps, 'register' | 'trigger' | 'getValues'>;

const SignupForm = () => {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
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

  const signFormData: FormData[] = [
    {
      placeholder: '이메일 입력',
      type: 'email',
      name: 'email',
      checkButton: true,
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
    },
    {
      placeholder: '비밀번호 확인 입력',
      type: 'password',
      name: 'confirmPassword',
      checkButton: false,
      errorMessage: errors.confirmPassword?.message,
      label: '비밀번호 확인'
    },
    {
      placeholder: '닉네임 입력',
      type: 'text',
      name: 'nickname',
      checkButton: true,
      errorMessage: errors.nickname?.message,
      label: '닉네임'
    }
  ];

  return (
    <AuthFormContainer>
      {signFormData.map((data, index) => (
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
      <FormButton mode={AUTH.SIGNUP} isSubmitting={isSubmitting} isValid={isValid} />
    </AuthFormContainer>
  );
};

export default SignupForm;
