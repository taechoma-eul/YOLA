export interface InputProps {
  label: string;
  name: string;
  inputType: string;
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface FormData {
  formData: InputProps[];
  mode: string;
}
