import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, signupSchema } from '@/lib/utils/validation/auth-shema';

export const useSignupForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
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
