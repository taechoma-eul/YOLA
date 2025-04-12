import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from '@/lib/utils/validation/auth-shema';
import type { EditFormData } from '@/types/components/edit-profile-form';

export const useProfileForm = (initNickname: string) => {
  const form = useForm<EditFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: initNickname,
      profile_image_file: null,
      profile_image: ''
    },
    mode: 'onBlur'
  });

  return form;
};
