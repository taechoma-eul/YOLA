import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/page-path';
import { CustomButton } from '@/components/ui/custom-button';

const GuestOptionMenu = () => {
  return (
    <CustomButton asChild variant="default" size="sm">
      <Link href={PATH.LOGIN}>로그인</Link>
    </CustomButton>
  );
};

export default GuestOptionMenu;
