import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/page-path';

const GuestOptionMenu = () => {
  return (
    <Button asChild className="rounded-none bg-zinc-300">
      <Link href={PATH.LOGIN}>로그인</Link>
    </Button>
  );
};

export default GuestOptionMenu;
