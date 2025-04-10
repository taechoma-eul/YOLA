import { UseFormReturn } from 'react-hook-form';
import { AuthFormData } from '@/lib/utils/validation/auth-validate';

export interface FieldData {
  inputType: string;
  fieldName: keyof AuthFormData;
  placeholder: string;
  isCheckButton?: boolean;
  form: UseFormReturn<AuthFormData, any, undefined>;
  isSubmitting: boolean;
}

export interface AuthFormMode {
  mode: 'login' | 'signup';
}
