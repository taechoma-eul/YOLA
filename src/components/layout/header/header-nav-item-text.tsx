import type { Children } from '@/types/children';

const NavText = ({ children }: Children) => {
  return <p className="w-32 justify-start text-center text-lg text-zinc-800">{children}</p>;
};

export default NavText;
