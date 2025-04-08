'use client';

import { useState, useTransition } from 'react';
import { login, signup } from '@/lib/utils/api/auth-action';
import { useAuthForm } from '@/lib/hooks/use-auth-form';
import { authToast } from '@/lib/utils/auth-toast';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import LoginFormButton from '@/components/features/auth-form/login-form-button';
import SignupFormButton from '@/components/features/auth-form/signup-form-button';
import { Form } from '@/components/ui/form';
import type { AuthFormMode, FieldData } from '@/types/components/auth-form';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';

type FormFieldData = Omit<FieldData, 'isSubmitting'>;

const AuthForm = ({ mode }: AuthFormMode) => {
  const form = useAuthForm();
  const [isPending, startTransition] = useTransition();
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState<boolean>(false);
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState<boolean>(false);

  const signupFieldData: FormFieldData[] = [
    {
      fieldName: AUTH.EMAIL,
      placeholder: PLACEHOLDER.EMAIL,
      isCheckButton: true,
      form: form,
      inputType: 'email'
    },
    {
      fieldName: AUTH.NICKNAME,
      placeholder: PLACEHOLDER.NICKNAME,
      isCheckButton: true,
      form: form,
      inputType: 'text'
    },
    { fieldName: AUTH.PASSWORD, placeholder: PLACEHOLDER.PASSWORD, form: form, inputType: 'password' },
    { fieldName: AUTH.CHECK_PASSWORD, placeholder: PLACEHOLDER.CHECK_PASSWORD, form: form, inputType: 'password' }
  ];

  const loginFieldData: FormFieldData[] = [
    { fieldName: AUTH.EMAIL, placeholder: PLACEHOLDER.EMAIL, form: form, inputType: 'email' },
    { fieldName: AUTH.PASSWORD, placeholder: PLACEHOLDER.PASSWORD, form: form, inputType: 'password' }
  ];

  const renderingData: FormFieldData[] = mode === AUTH.SIGNUP ? signupFieldData : loginFieldData;

  const handleFormAction = async (formData: FormData) => {
    if (!emailDuplicateCheck) {
      authToast('이메일 중복확인을 해주세요.');
      return;
    } else if (!nicknameDuplicateCheck) {
      authToast('닉네임 중복확인을 해주세요.');
      return;
    }

    startTransition(async () => {
      mode === AUTH.SIGNUP ? await signup(formData) : await login(formData);
    });
  };

  return (
    <Form {...form}>
      <form className="mt-10 w-[365px] space-y-8" action={handleFormAction}>
        {renderingData.map((data) => (
          <AuthFormField
            setEmailDuplicateCheck={setEmailDuplicateCheck}
            setNicknameDuplicateCheck={setNicknameDuplicateCheck}
            key={data.fieldName}
            fieldName={data.fieldName}
            placeholder={data.placeholder}
            isCheckButton={data.isCheckButton}
            form={data.form}
            inputType={data.inputType}
          />
        ))}
        {mode === AUTH.SIGNUP ? (
          <SignupFormButton isSubmitting={isPending} />
        ) : (
          <LoginFormButton isSubmitting={isPending} />
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
