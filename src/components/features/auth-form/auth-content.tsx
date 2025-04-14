interface ContentProps {
  title: string;
  form: React.ReactNode;
}

const AuthContent = ({ title, form }: ContentProps) => {
  return (
    <div className="w-full justify-items-center">
      <h1 className="mb-4 text-center text-2xl font-bold">{title}</h1>
      {form}
    </div>
  );
};

export default AuthContent;
