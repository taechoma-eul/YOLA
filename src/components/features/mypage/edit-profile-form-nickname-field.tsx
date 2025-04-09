'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { getDuplicateCheckData } from '@/lib/utils/api/auth-action';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EditFormData } from '@/types/components/edit-profile-form';
import { AUTH, ERROR_MESSAGE, LABEL, PLACEHOLDER, SUCCESS_MESSAGE } from '@/constants/auth-form';
import { toastAlert } from '@/lib/utils/toast';

interface FieldProps {
  form: UseFormReturn<EditFormData, any, undefined>;
  setDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  initNickname: string;
}

const NicknameField = ({ form, setDuplicateCheck, initNickname }: FieldProps) => {
  const { watch, getValues } = useFormContext();
  const nicknameValue = watch(AUTH.NICKNAME);

  useEffect(() => {
    setDuplicateCheck(false); // 값 변경 시 중복확인 상태 초기화

    if (initNickname === getValues(AUTH.NICKNAME)) setDuplicateCheck(true); // 기존 닉네임과 같으면 중복검사 pass
  }, [nicknameValue, setDuplicateCheck]);

  const handleDuplicateCheck = async () => {
    const nowValue: string = getValues(AUTH.NICKNAME);

    if (initNickname === nowValue) setDuplicateCheck(true);

    if (!nowValue) {
      toastAlert(ERROR_MESSAGE.NONE_NICKNAME, 'destructive');
      return;
    }

    const data = await getDuplicateCheckData(AUTH.NICKNAME, nowValue);

    if (data) {
      toastAlert(ERROR_MESSAGE.CHECK_NICKNAME_FAIL, 'destructive');
    } else {
      toastAlert(SUCCESS_MESSAGE, 'default');
      setDuplicateCheck(true);
    }
  };

  return (
    <FormField
      control={form.control}
      name={AUTH.NICKNAME}
      render={({ field }) => (
        <FormItem className="flex h-8 items-center justify-start gap-10 self-stretch">
          <FormLabel className="justify-start text-lg font-normal">{LABEL.NICKNAME}</FormLabel>
          <div className="flex-1">
            <FormControl>
              <Input
                className="flex h-full w-full items-center justify-start gap-2.5 rounded p-2.5 shadow-none outline outline-1 outline-offset-[-1px] outline-stone-300"
                placeholder={PLACEHOLDER.NICKNAME}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </div>
          <Button type="button" className="h-full w-[70px]" onClick={handleDuplicateCheck}>
            중복확인
          </Button>
        </FormItem>
      )}
    />
  );
};

export default NicknameField;
