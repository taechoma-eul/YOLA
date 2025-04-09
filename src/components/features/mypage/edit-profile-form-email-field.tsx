import { LABEL } from '@/constants/auth-form';

const EmailField = ({ email }: { email: string }) => {
  return (
    <div className="flex h-8 items-center justify-start gap-10 self-stretch">
      <p className="justify-start text-lg">{LABEL.EMAIL}</p>
      <p className="justify-start text-lg">{email}</p>
    </div>
  );
};

export default EmailField;
