import { Children } from '@/types/children';

const AuthFormContainer = ({ children }: Children) => {
  return <form className="space-y-10">{children}</form>;
};

export default AuthFormContainer;
