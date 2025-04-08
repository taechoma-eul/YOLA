import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EditFormData } from '@/types/components/edit-profile-form';

interface FieldProps {
  form: UseFormReturn<EditFormData, any, undefined>;
}

const NicknameField = ({ form }: FieldProps) => {
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
          <Button type="button" className="h-full w-[70px]">
            중복확인
          </Button>
        </FormItem>
      )}
    />
  );
};

export default NicknameField;
