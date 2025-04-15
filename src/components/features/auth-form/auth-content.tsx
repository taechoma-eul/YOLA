interface ContentProps {
  title: string;
  form: React.ReactNode;
}

const AuthContent = ({ title, form }: ContentProps) => {
  return (
    <div className="mt-[60px] w-full justify-items-center">
      <h1 className="text-secondary-grey-900 justify-start text-center text-xl font-semibold leading-relaxed">
        {title}
      </h1>
      {form}
    </div>
  );
};

export default AuthContent;
