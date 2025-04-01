import { SignupFormData } from '@/lib/utils/authValidate';
import { UseFormGetValues, UseFormRegister, UseFormTrigger } from 'react-hook-form';

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
