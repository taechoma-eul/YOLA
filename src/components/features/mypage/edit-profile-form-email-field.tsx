import { LABEL } from '@/constants/auth-form';

const EmailField = ({ email }: { email: string }) => {
  return (
    <div className="flex h-[25px] items-center justify-start gap-[21px] self-stretch overflow-hidden text-secondary-grey-900 md:gap-10">
      <p className="justify-start text-lg">{LABEL.EMAIL}</p>
      <p className="justify-start text-lg">{email}</p>
    </div>
  );
};

export default EmailField;
