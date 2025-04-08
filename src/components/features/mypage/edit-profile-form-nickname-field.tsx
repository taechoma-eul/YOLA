'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { getDuplicateCheckData } from '@/lib/utils/api/auth-action';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EditFormData } from '@/types/components/edit-profile-form';
import { AUTH } from '@/constants/auth-form';

interface FieldProps {
  form: UseFormReturn<EditFormData, any, undefined>;
  setDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  initNickname: string;
}

const NicknameField = ({ form, setDuplicateCheck, initNickname }: FieldProps) => {
  const { watch, getValues } = useFormContext();
  const nicknameValue = watch('nickname');

  useEffect(() => {
    setDuplicateCheck(false); // 값 변경 시 중복확인 상태 초기화

    if (initNickname === getValues('nickname')) setDuplicateCheck(true); // 기존 닉네임과 같으면 중복검사 pass
  }, [nicknameValue, setDuplicateCheck]);

  const handleDuplicateCheck = async () => {
    const nowValue: string = getValues('nickname');

    if (initNickname === nowValue) setDuplicateCheck(true);

    if (!nowValue) {
      alert(`${AUTH.NICKNAME_LABEL}을 먼저 입력해주세요`);
      return;
    }

    const data = await getDuplicateCheckData('nickname', nowValue);

    if (data) {
      alert(`이미 사용 중인 ${AUTH.NICKNAME_LABEL}입니다`);
    } else {
      alert('사용 가능합니다');
      setDuplicateCheck(true);
    }
  };

  return (
    <FormField
      control={form.control}
      name="nickname"
      render={({ field }) => (
        <FormItem className="flex h-8 items-center justify-start gap-10 self-stretch">
          <FormLabel className="justify-start text-lg font-normal">닉네임</FormLabel>
          <div className="flex-1">
            <FormControl>
              <Input
                className="flex h-full w-full items-center justify-start gap-2.5 rounded p-2.5 shadow-none outline outline-1 outline-offset-[-1px] outline-stone-300"
                placeholder="닉네임 입력"
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
