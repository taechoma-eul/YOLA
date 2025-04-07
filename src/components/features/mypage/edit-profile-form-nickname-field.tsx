import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditFormData } from '@/types/components/edit-profile-form';
import { ControllerRenderProps } from 'react-hook-form';

const NicknameField = ({
  field,
  nickname
}: {
  field: ControllerRenderProps<EditFormData, 'nickname'>;
  nickname: string;
}) => {
  return (
    <FormItem className="flex items-center space-x-5">
      <FormLabel className="w-20 text-end text-lg">닉네임</FormLabel>
      <div className="flex flex-1 items-center space-x-3">
        <div className="flex-1">
          <FormControl>
            <Input className="w-full" placeholder={nickname} {...field} />
          </FormControl>
          <FormMessage />
        </div>
        <Button type="button">중복확인</Button>
      </div>
    </FormItem>
  );
};

export default NicknameField;
