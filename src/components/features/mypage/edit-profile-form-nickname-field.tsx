'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import clsx from 'clsx';
import { fetchDuplicateCheck } from '@/lib/utils/api/auth-client.api';
import DuplicateCheckMessage from '@/components/features/auth-form/duplicate-check-message';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EditFormData } from '@/types/components/edit-profile-form';
import { AUTH, LABEL, PLACEHOLDER } from '@/constants/auth-form';
import { AUTH_ERROR, FAIL, SUCCESS } from '@/constants/messages';

interface FieldProps {
  form: UseFormReturn<EditFormData, any, undefined>;
  setDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  initNickname: string;
}

const NicknameField = ({ form, setDuplicateCheck, initNickname }: FieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 중복 확인 실패 메시지
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 중복 확인 성공 메시지
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

    // 값 없으면 리턴
    if (!nowValue) {
      setErrorMessage(AUTH_ERROR.NONE_NICKNAME);
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
    } catch (error) {
      setErrorMessage(FAIL.DUPLICATE);
    }
  };

  // -------------------------------------------------
  return (
    <FormField
      control={form.control}
      name={AUTH.NICKNAME}
      render={({ field }) => (
        <FormItem className="flex h-10 items-center justify-start gap-10 self-stretch">
          <FormLabel
            className={clsx('justify-start text-lg font-normal', errorMessage ? 'text-destructive' : 'text-zinc-800')}
          >
            {LABEL.NICKNAME}
          </FormLabel>
          <div className="relative flex-1">
            <FormControl>
              <Input
                className={clsx(
                  'flex h-full w-full items-center justify-start gap-2.5 rounded p-2.5',
                  errorMessage ? 'border-[#FF5E3A]' : 'border-stone-300'
                )}
                placeholder={PLACEHOLDER.NICKNAME}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
            <DuplicateCheckMessage errorMessage={errorMessage} successMessage={successMessage} />
          </div>
          {/* 유효성 검사 통과 못하면 중복 검사 불가 */}
          <Button
            disabled={!form.formState.isValid}
            type="button"
            className="h-full w-[70px]"
            onClick={handleDuplicateCheck}
          >
            중복확인
          </Button>
        </FormItem>
      )}
    />
  );
};

export default NicknameField;
