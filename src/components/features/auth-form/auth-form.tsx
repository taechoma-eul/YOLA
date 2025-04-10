'use client';

import { useState, useTransition } from 'react';
import { login, signup } from '@/lib/utils/api/auth-action';
import { useAuthForm } from '@/lib/hooks/use-auth-form';
import { toastAlert } from '@/lib/utils/toast';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import LoginFormButton from '@/components/features/auth-form/login-form-button';
import SignupFormButton from '@/components/features/auth-form/signup-form-button';
import { Form } from '@/components/ui/form';
import type { AuthFormMode, FieldData } from '@/types/components/auth-form';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';
import { AUTH_ERROR, SUCCESS } from '@/constants/messages';

type FormFieldData = Omit<FieldData, 'isSubmitting'>;

const AuthForm = ({ mode }: AuthFormMode) => {
  const [isPending, startTransition] = useTransition();
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState<boolean>(false);
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState<boolean>(false);

  const form = useAuthForm(mode);
  const { isValid } = form.formState;

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
    if (!isValid) {
      toastAlert(AUTH_ERROR.FIELD_CHECK, 'destructive');
      return;
    }

    if (mode === AUTH.LOGIN) {
      startTransition(async () => {
        try {
          await login(formData);
          toastAlert(SUCCESS.LOGIN, 'success');
        } catch (error) {
          if (error instanceof Error) toastAlert(error.message, 'destructive');
        }
      });
      return;
    }
    if (!emailDuplicateCheck) {
      toastAlert(AUTH_ERROR.EMAIL_CHECK, 'destructive');
      return;
    }
    if (!nicknameDuplicateCheck) {
      toastAlert(AUTH_ERROR.NICKNAME_CHECK, 'destructive');
      return;
    }

    startTransition(async () => {
      await signup(formData);
      toastAlert(SUCCESS.SIGNUP, 'success');
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
