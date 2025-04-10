'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { getDuplicateCheckData } from '@/lib/utils/api/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { AuthFormData } from '@/lib/utils/validation/auth-validate';
import { AUTH, LABEL } from '@/constants/auth-form';
import { AUTH_ERROR, SUCCESS } from '@/constants/messages';

interface FieldProps<T extends keyof AuthFormData> {
  inputType: string;
  fieldName: T;
  placeholder: string;
  isCheckButton?: boolean;
  form: UseFormReturn<AuthFormData, any, undefined>;
  setNicknameDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  setEmailDuplicateCheck: Dispatch<SetStateAction<boolean>>;
}

const AuthFormField = <T extends keyof AuthFormData>({
  inputType,
  fieldName,
  placeholder,
  isCheckButton = false,
  form,
  setNicknameDuplicateCheck,
  setEmailDuplicateCheck
}: FieldProps<T>) => {
  const { watch, getValues } = useFormContext();
  const fieldValue = watch(fieldName);

  const setDuplicateCheck: Dispatch<SetStateAction<boolean>> =
    fieldName === AUTH.EMAIL ? setEmailDuplicateCheck : setNicknameDuplicateCheck; // 필드에 따른 중복검사 체크를 위한 할당

  useEffect(() => {
    setDuplicateCheck(false); // 값 변경 시 중복확인 상태 초기화\
  }, [fieldValue, setDuplicateCheck]);

  const handleDuplicateCheck = async () => {
    const nowValue: string = getValues(fieldName);

    if (!nowValue) {
      toastAlert(fieldName === AUTH.EMAIL ? AUTH_ERROR.NONE_EMAIL : AUTH_ERROR.NONE_NICKNAME, 'destructive');
      return;
    }

    const data = await getDuplicateCheckData(fieldName, nowValue);

    if (data) {
      toastAlert(
        fieldName === AUTH.EMAIL ? AUTH_ERROR.CHECK_EMAIL_FAIL : AUTH_ERROR.CHECK_NICKNAME_FAIL,
        'destructive'
      );
    } else {
      toastAlert(`${SUCCESS.CHECK} ${fieldName === AUTH.EMAIL ? LABEL.EMAIL : LABEL.NICKNAME}입니다.`, 'default');
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
