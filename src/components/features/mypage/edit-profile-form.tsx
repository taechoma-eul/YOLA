'use client';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DEFAULT_AVATAR from '@images/images/default-avatar.png';
import Image from 'next/image';

const formSchema = z.object({
  nickname: z
    .string({ required_error: '닉네임을 입력해주세요.' })
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(10, '닉네임은 10자 이하여야 합니다.')
});

const EditProfileForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: ''
    }
  });
  return (
    <Form {...form}>
      <form className="w-[500px] space-y-5 border-2 p-5">
        <div className="mx-auto mb-10 flex w-[150px] flex-col justify-center gap-5">
          <figure>
            <Image src={DEFAULT_AVATAR} alt="프로필 이미지" width={150} height={150} className="rounded-full border" />
          </figure>
          <Button>이미지 변경</Button>
        </div>
        <div className="flex items-center space-x-5">
          <p className="w-20 text-end text-lg">이메일</p>
          <div className="flex-1">
            <p className="mb-3 text-lg">suim0215@gmail.com</p>
          </div>
        </div>
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-5">
              <FormLabel className="w-20 text-end text-lg">닉네임</FormLabel>
              <div className="flex flex-1 items-center space-x-3">
                <div className="flex-1">
                  <FormControl>
                    <Input className="w-full" placeholder="닉네임 입력" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
                <Button type="button">중복확인</Button>
              </div>
            </FormItem>
          )}
        />
        <div className="h-[30px]" />
        <Button type="submit" className="w-full">
          저장하기
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
