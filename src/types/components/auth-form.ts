import { UseFormGetValues, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { SignupFormData } from '@/lib/utils/validation/auth-validate';

export interface AuthInputProps {
  register: UseFormRegister<SignupFormData>;
  trigger: UseFormTrigger<SignupFormData>;
  placeholder: string;
  type: string;
  name: 'email' | 'password' | 'confirmPassword' | 'nickname';
  checkButton?: boolean;
  label: string;
  errorMessage?: string | undefined;
  getValues: UseFormGetValues<SignupFormData>;
}
