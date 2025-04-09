import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormData, signupSchema, loginSchema } from '@/lib/utils/validation/auth-validate';
import { AUTH } from '@/constants/auth-form';

export const useAuthForm = (mode: 'signup' | 'login') => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(mode === AUTH.SIGNUP ? signupSchema : loginSchema),
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
