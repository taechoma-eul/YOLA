const EmailField = ({ email }: { email: string }) => {
  return (
    <div className="flex h-8 items-center justify-start gap-10 self-stretch">
      <p className="justify-start text-lg">이메일</p>
      <p className="justify-start text-lg">{email}</p>
    </div>
  );
};

export default EmailField;
