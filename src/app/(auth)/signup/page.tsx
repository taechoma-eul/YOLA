import Form from '@/components/features/auth-form/auth-form';
import { MODE } from '@/constants/auth-form';

const SignUpPage = () => {
  const signupFormData = [
    { label: '이메일', name: 'email', inputType: 'email', button: <button>중복확인</button> },
    { label: '비밀번호', name: 'password', inputType: 'password' },
    { label: '비밀번호 확인', name: 'password', inputType: 'password' },
    { label: '닉네임', name: 'nickname', inputType: 'text', button: <button>중복확인</button> }
  ];
  return <Form formData={signupFormData} mode={MODE.SIGNUP} />;
};

export default SignUpPage;
