import { PATH } from '@/constants/page-path';
import { redirect } from 'next/navigation';

const GonggamPage = () => {
  redirect(PATH.GONGGAM_DAILY);
};

export default GonggamPage;
