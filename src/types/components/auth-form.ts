import { UseFormReturn } from 'react-hook-form';
import { AuthFormData } from '@/lib/utils/validation/auth-validate';

export interface FieldData {
  inputType: string;
  fieldName: keyof AuthFormData;
  placeholder: string;
  labelName?: string;
  isCheckButton?: boolean;
  isLabel?: boolean;
  form: UseFormReturn<AuthFormData, any, undefined>;
  isSubmitting: boolean;
}
