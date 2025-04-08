'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { getDuplicateCheckData } from '@/lib/utils/api/auth-action';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { AuthFormData } from '@/lib/utils/validation/auth-validate';
import { AUTH, LABEL } from '@/constants/auth-form';

interface FieldProps<T extends keyof AuthFormData> {
  inputType: string;
  fieldName: T;
  placeholder: string;
  isCheckButton?: boolean;
  form: UseFormReturn<AuthFormData, any, undefined>;
  setNicknameDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  setEmailDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  isSignup?: boolean;
}

const AuthFormField = <T extends keyof AuthFormData>({
  inputType,
  fieldName,
  placeholder,
  isCheckButton = false,
  form,
  setNicknameDuplicateCheck,
  setEmailDuplicateCheck,
  isSignup = false
}: FieldProps<T>) => {
  const { watch, getValues } = useFormContext();
  const fieldValue = watch(fieldName);
  const setDuplicateCheck: Dispatch<SetStateAction<boolean>> =
    fieldName === AUTH.EMAIL ? setEmailDuplicateCheck : setNicknameDuplicateCheck;

  useEffect(() => {
    setDuplicateCheck(false); // 값 변경 시 중복확인 상태 초기화\
    !isSignup && setDuplicateCheck(true);
  }, [fieldValue, setDuplicateCheck]);

  const handleDuplicateCheck = async () => {
    const nowValue: string = getValues(fieldName);

    if (!nowValue) {
      alert(`${fieldName === AUTH.EMAIL ? LABEL.EMAIL : LABEL.NICKNAME}을 먼저 입력해주세요`);
      return;
    }

    const data = await getDuplicateCheckData(fieldName, nowValue);

    if (data) {
      alert(`이미 사용 중인 ${fieldName === AUTH.EMAIL ? LABEL.EMAIL : LABEL.NICKNAME}입니다`);
    } else {
      alert('사용 가능합니다');
      setDuplicateCheck(true);
    }
  };
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-5">
          <div className="flex flex-1 items-center space-x-3">
            <div className="flex-1">
              <FormControl>
                <Input className="h-11 w-full" placeholder={placeholder} type={inputType} {...field} />
              </FormControl>
              <FormMessage />
            </div>
            {isCheckButton && (
              <Button type="button" className="h-11 w-[70px]" onClick={handleDuplicateCheck}>
                중복확인
              </Button>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default AuthFormField;
