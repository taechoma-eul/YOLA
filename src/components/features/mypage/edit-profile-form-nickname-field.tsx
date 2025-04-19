'use client';

import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import DuplicateCheckMessage from '@/components/features/auth-form/duplicate-check-message';
import { CustomButton } from '@/components/ui/custom-button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AUTH, LABEL, PLACEHOLDER } from '@/constants/auth-form';
import { AUTH_ERROR, FAIL, SUCCESS } from '@/constants/messages';
import { fetchDuplicateCheck } from '@/lib/utils/api/auth-client.api';
import type { EditFormData } from '@/types/edit-profile-form';

interface FieldProps {
  form: UseFormReturn<EditFormData, any, undefined>;
  setDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  initNickname: string;
}

const NicknameField = ({ form, setDuplicateCheck, initNickname }: FieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 중복 확인 실패 메시지
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 중복 확인 성공 메시지
  const { isValid } = form.formState;
  const { watch, getValues } = useFormContext(); // 필드 값 변경 감지
  const nicknameValue = watch(AUTH.NICKNAME);

  // -------------------------------------------------
  useEffect(() => {
    setDuplicateCheck(false); // 값 변경 시 중복확인 상태 초기화
    setSuccessMessage(null);
    setErrorMessage(null);

    if (initNickname === getValues(AUTH.NICKNAME)) setDuplicateCheck(true); // 기존 닉네임과 같으면 중복검사 pass
  }, [nicknameValue, setDuplicateCheck]);

  // -------------------------------------------------
  const handleDuplicateCheck = async () => {
    const nowValue: string = getValues(AUTH.NICKNAME);

    if (!isValid) {
      setErrorMessage(AUTH_ERROR.EMPTY_NICKNAME);
      return;
    }

    try {
      const isDuplication = await fetchDuplicateCheck(AUTH.NICKNAME, nowValue);

      // 중복 있으면 리턴
      if (isDuplication) {
        setErrorMessage(AUTH_ERROR.CHECK_NICKNAME_FAIL);
        return;
      }
      setSuccessMessage(SUCCESS.NICKNAME_CHECK);
      setDuplicateCheck(true);
      return;
    } catch {
      setErrorMessage(FAIL.DUPLICATE);
    }
  };

  // -------------------------------------------------
  return (
    <FormField
      control={form.control}
      name={AUTH.NICKNAME}
      render={({ field }) => (
        <FormItem className="flex h-10 items-center justify-start self-stretch">
          <FormLabel
            className={clsx(
              'justify-start text-lg font-normal',
              errorMessage ? 'text-destructive' : 'text-secondary-grey-900'
            )}
          >
            {LABEL.NICKNAME}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                className={clsx(
                  'ml-[42px] mr-[8px] flex h-[37px] w-[269px] items-center justify-start gap-2.5 rounded border-secondary-grey-400 p-2.5'
                )}
                placeholder={PLACEHOLDER.NICKNAME}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
            <DuplicateCheckMessage errorMessage={errorMessage} successMessage={successMessage} />
          </div>
          <CustomButton type="button" variant="grey" size="check" className="h-[38px]" onClick={handleDuplicateCheck}>
            중복확인
          </CustomButton>
        </FormItem>
      )}
    />
  );
};

export default NicknameField;
