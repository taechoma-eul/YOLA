interface InputProps {
  label: string;
  name: string;
  inputType: string;
}

const FormInput = ({ label, name, inputType }: InputProps) => {
  return (
    <div className="flex gap-7 text-end">
      <p className="w-20">{label}</p>
      <input id={name} name={name} type={inputType} required className="h-10 w-full border-2" />
    </div>
  );
};

export default FormInput;
