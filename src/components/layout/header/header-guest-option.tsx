import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/page-path';

const GuestOptionMenu = () => {
  return (
    <Button
      asChild
      data-priority="Primary"
      data-size="Small"
      data-status="Default"
      className="hover: inline-flex items-center justify-center gap-2.5 rounded-lg bg-amber-400 px-3 py-2 text-zinc-800 hover:bg-amber-200"
    >
      <Link href={PATH.LOGIN}>로그인</Link>
    </Button>
  );
};

export default GuestOptionMenu;
