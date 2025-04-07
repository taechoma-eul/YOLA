const ProfileEmailField = ({ email }: { email: string }) => {
  return (
    <div className="flex items-center space-x-5">
      <p className="w-20 text-end text-lg">이메일</p>
      <div className="flex-1">
        <p className="mb-3 text-lg">{email}</p>
      </div>
    </div>
  );
};

export default ProfileEmailField;
