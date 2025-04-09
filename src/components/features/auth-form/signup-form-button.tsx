import { Button } from '@/components/ui/button';
import type { FieldData } from '@/types/components/auth-form';

const SignupFormButton = ({ isSubmitting }: Pick<FieldData, 'isSubmitting'>) => {
  return (
    <div className="space-y-3 pt-3">
      <Button type="submit" className="h-[42px] w-full">
        {!isSubmitting ? '가입하기' : '회원등록 중...'}
      </Button>
    </div>
  );
};

export default SignupFormButton;
