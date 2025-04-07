'use client';

import { UseFormReturn } from 'react-hook-form';
import { signup } from '@/lib/utils/api/auth-action';
import { useAuthForm } from '@/lib/hooks/use-auth-form';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { authFormData } from '@/lib/utils/validation/auth-validate';

// 동적 필드 타입
interface FieldData {
  inputType: string;
  fieldName: keyof authFormData;
  placeholder: string;
  labelName?: string;
  isCheckButton?: boolean;
  isLabel?: boolean;
  form: UseFormReturn<authFormData, any, undefined>;
}

const SignupForm = () => {
  const form = useAuthForm();

  const signupFieldData: FieldData[] = [
    { fieldName: 'email', placeholder: '이메일을 입력하세요.', isCheckButton: true, form: form, inputType: 'email' },
    { fieldName: 'nickname', placeholder: '닉네임을 입력하세요.', isCheckButton: true, form: form, inputType: 'text' },
    { fieldName: 'password', placeholder: '비밀번호를 입력하세요.', form: form, inputType: 'password' },
    { fieldName: 'checkPassword', placeholder: '비밀번호를 한번 더 입력하세요.', form: form, inputType: 'password' }
  ];

  return (
    <Form {...form}>
      <form className="mt-10 w-[365px] space-y-8">
        {signupFieldData.map((data) => (
          <AuthFormField
            key={data.fieldName}
            fieldName={data.fieldName}
            placeholder={data.placeholder}
            isCheckButton={data.isCheckButton}
            form={data.form}
            inputType={data.inputType}
          />
        ))}
        <div className="space-y-3 pt-3">
          <Button type="submit" formAction={signup} className="h-[42px] w-full">
            가입하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
