'use client';

import { login, signup } from '@/lib/utils/api/auth-action';
import type { SignupFormData } from '@/lib/utils/authValidate';
import { signupSchema } from '@/lib/utils/authValidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import AuthFormInput from './auth-form-input';
import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import { AuthInputProps } from '@/types/components/auth-form';
import { MODE } from '@/constants/auth-form';
import { supabase } from '@/lib/utils/supabase/supabase-client';

type FormData = Omit<AuthInputProps, 'register' | 'trigger' | 'getValues'>;

const AuthForm = ({ mode }: { mode: string }) => {
  const {
    register,
    handleSubmit,
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
      label: '이메일'
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

  if (mode === MODE.SIGNUP) {
    return (
      <form className="space-y-10">
        {signFormData.map((data) => (
          <AuthFormInput
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
        {/* 제출 버튼 */}
        <div>
          <button formAction={signup} type="submit" disabled={isSubmitting} className="w-full bg-gray-100 p-2">
            {isSubmitting ? '가입 중...' : '회원가입'}
          </button>
          <p className="mt-5 text-center">
            이미 계정이 있으신가요?{' '}
            <Link href={PATH.LOGIN} className="text-blue-500">
              로그인
            </Link>
          </p>
        </div>
      </form>
    );
  }

  if (mode === MODE.LOGIN) {
    return (
      <form className="space-y-10">
        {loginFormData.map((data) => (
          <AuthFormInput
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
        {/* 제출 버튼 */}
        <div>
          <button formAction={login} type="submit" disabled={isSubmitting} className="w-full bg-gray-100 p-2">
            {isSubmitting ? '로그인 중..' : '로그인'}
          </button>
          <p className="mt-5 text-center">
            아직 회원이 아니신가요?{' '}
            <Link href={PATH.SIGNUP} className="text-blue-500">
              회원가입
            </Link>
          </p>
        </div>
      </form>
    );
  }
};

export default AuthForm;
