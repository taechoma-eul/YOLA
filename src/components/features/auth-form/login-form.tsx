'use client';

import { useTransition } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { login } from '@/lib/utils/api/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import { useLoginForm } from '@/lib/hooks/use-login-form';
import { Form, FormField } from '@/components/ui/form';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import LoginFormButton from '@/components/features/auth-form/login-form-button';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';
import { SUCCESS } from '@/constants/messages';

interface LoginField {
  fieldName: 'email' | 'password';
  placeholder: string;
  form: UseFormReturn<{
    password: string;
    email: string;
  }>;
  inputType: string;
  isLoginForm: boolean;
}

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useLoginForm();

  const { isValid } = form.formState;

  const loginFieldData: LoginField[] = [
    { fieldName: AUTH.EMAIL, placeholder: PLACEHOLDER.EMAIL, form: form, inputType: 'email', isLoginForm: true },
    {
      fieldName: AUTH.PASSWORD,
      placeholder: PLACEHOLDER.PASSWORD,
      form: form,
      inputType: 'password',
      isLoginForm: true
    }
  ];

  const handleFormAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await login(formData);
        toastAlert(SUCCESS.LOGIN, 'success');
      } catch (error) {
        if (error instanceof Error) toastAlert(error.message, 'destructive');
      }
    });
  };

  return (
    <Form {...form}>
      <form className="mt-[37px] w-[360px]" action={handleFormAction}>
        <div className="mb-[28px] flex flex-col gap-[17px]">
          {loginFieldData.map((data, index) => (
            <FormField
              key={index}
              control={form.control}
              name={data.fieldName}
              render={({ field }) => (
                <AuthFormField
                  fieldName={data.fieldName}
                  placeholder={data.placeholder}
                  inputType={data.inputType}
                  field={field}
                  isLoginForm={data.isLoginForm}
                />
              )}
            />
          ))}
        </div>
        <LoginFormButton isValid={isValid} isLoginPending={isPending} />
      </form>
    </Form>
  );
};

export default LoginForm;
