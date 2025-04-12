'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { fetchDuplicateCheck } from '@/lib/utils/api/auth-client.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import DuplicateCheckMessage from '@/components/features/auth-form/duplicate-check-message';
import { AUTH } from '@/constants/auth-form';
import { AUTH_ERROR, FAIL, SUCCESS } from '@/constants/messages';

interface FieldProps<T extends FieldValues> {
  inputType: string;
  placeholder: string;
  isCheckButton?: boolean;
  fieldName: string;
  field: ControllerRenderProps<T>;
  isValid?: boolean;
  setEmailDuplicateCheck?: Dispatch<SetStateAction<boolean>>;
  setNicknameDuplicateCheck?: Dispatch<SetStateAction<boolean>>;
}

const AuthFormField = <T extends FieldValues>({
  inputType,
  placeholder,
  isCheckButton = false,
  fieldName,
  field,
  isValid,
  setEmailDuplicateCheck,
  setNicknameDuplicateCheck
}: FieldProps<T>) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 중복 확인 실패 메시지
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 중복 확인 성공 메시지
  const { watch, getValues } = useFormContext();
  const fieldValue = watch(fieldName);

  const setDuplicateCheck = fieldName === AUTH.EMAIL ? setEmailDuplicateCheck : setNicknameDuplicateCheck; // 필드에 따른 중복검사 체크를 위한 할당

  // -------------------------------------------------
  useEffect(() => {
    if (setDuplicateCheck && (fieldName === AUTH.EMAIL || fieldName === AUTH.NICKNAME)) {
      setDuplicateCheck(false);
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [fieldValue, setDuplicateCheck, fieldName]);

  // -------------------------------------------------

  const handleDuplicateCheck = async () => {
    if (setDuplicateCheck) {
      const nowValue: string = getValues(fieldName);

      try {
        const isDuplication = await fetchDuplicateCheck(fieldName, nowValue);

        // 중복 있으면 리턴
        if (isDuplication) {
          setErrorMessage(fieldName === AUTH.EMAIL ? AUTH_ERROR.CHECK_EMAIL_FAIL : AUTH_ERROR.CHECK_NICKNAME_FAIL);
          return;
        }
        setSuccessMessage(fieldName === AUTH.EMAIL ? SUCCESS.EMAIL_CHECK : SUCCESS.NICKNAME_CHECK);
        setDuplicateCheck(true);
        return;
      } catch (error) {
        setErrorMessage(FAIL.DUPLICATE);
      }
    }
  };

  return (
    <FormItem className="flex items-center space-x-5">
      <div className="flex flex-1 items-center space-x-3">
        <div className="relative flex-1">
          <FormControl>
            <Input
              className={clsx('h-11 w-full', errorMessage ? 'border-[#FF5E3A]' : 'border-stone-300')}
              placeholder={placeholder}
              type={inputType}
              {...field}
            />
          </FormControl>
          <FormMessage />
          <DuplicateCheckMessage errorMessage={errorMessage} successMessage={successMessage} />
        </div>
        {isCheckButton && (
          <Button disabled={!isValid} type="button" className="h-11 w-[70px]" onClick={handleDuplicateCheck}>
            중복확인
          </Button>
        )}
      </div>
    </FormItem>
  );
};

export default AuthFormField;
