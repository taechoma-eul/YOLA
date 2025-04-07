import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormData, authSchema } from '@/lib/utils/validation/auth-validate';

export const useAuthForm = () => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      checkPassword: '',
      nickname: ''
    },
    mode: 'onBlur'
  });

  return form;
};
