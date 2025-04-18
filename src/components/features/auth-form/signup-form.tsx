'use client';

import { useState, useTransition } from 'react';
import { UseFormReturn } from 'react-hook-form';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import SignupFormButton from '@/components/features/auth-form/signup-form-button';
import { Form, FormField } from '@/components/ui/form';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';
import { AUTH_ERROR, SUCCESS } from '@/constants/messages';
import { useSignupForm } from '@/lib/hooks/use-signup-form';
import { signup } from '@/lib/utils/api/auth/auth-action';
import { toastAlert } from '@/lib/utils/toast';

interface SignupField {
  fieldName: 'email' | 'password' | 'checkPassword' | 'nickname';
  placeholder: string;
  form: UseFormReturn<{
    email: string;
    password: string;
    checkPassword: string;
    nickname: string;
  }>;
  inputType: string;
  isCheckButton?: boolean;
  isValid?: boolean;
}

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState<boolean>(false);
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState<boolean>(false);

  const form = useSignupForm();
  const { isValid } = form.formState;

  const signupFieldData: SignupField[] = [
    {
      fieldName: AUTH.EMAIL,
      placeholder: PLACEHOLDER.EMAIL,
      isCheckButton: true,
      form: form,
      inputType: 'email',
      isValid: form.formState.dirtyFields.email && !form.formState.errors.email
    },
    {
      fieldName: AUTH.NICKNAME,
      placeholder: PLACEHOLDER.NICKNAME,
      isCheckButton: true,
      form: form,
      inputType: 'text',
      isValid: form.formState.dirtyFields.nickname && !form.formState.errors.nickname
    },
    { fieldName: AUTH.PASSWORD, placeholder: PLACEHOLDER.PASSWORD, form: form, inputType: 'password' },
    {
      fieldName: AUTH.CHECK_PASSWORD,
      placeholder: PLACEHOLDER.CHECK_PASSWORD,
      form: form,
      inputType: 'password',
      isValid: form.formState.dirtyFields.checkPassword && !form.formState.errors.checkPassword
    }
  ];

  const handleFormAction = async (formData: FormData) => {
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
        {signupFieldData.map((data, index) => (
          <FormField
            key={index}
            control={form.control}
            name={data.fieldName}
            render={({ field }) => (
              <AuthFormField
                fieldName={data.fieldName}
                placeholder={data.placeholder}
                inputType={data.inputType}
                isValid={data.isValid}
                field={field}
                isCheckButton={data.isCheckButton}
                setEmailDuplicateCheck={setEmailDuplicateCheck}
                setNicknameDuplicateCheck={setNicknameDuplicateCheck}
              />
            )}
          />
        ))}
        <SignupFormButton isValid={isValid} isSignupPending={isPending} />
      </form>
    </Form>
  );
};

export default SignupForm;
