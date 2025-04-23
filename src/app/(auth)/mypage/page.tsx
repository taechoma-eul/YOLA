import EditProfileForm from '@/components/features/mypage/edit-profile-form';
import { PATH } from '@/constants/page-path';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';
import Image from 'next/image';
import Link from 'next/link';
import BACK from '@images/images/edit-profile-back-icon.svg';

const MyPage = async () => {
  const profile = await getUserProfile();
  if (!profile) throw Error;

  return (
    <div className="fixed inset-0 z-20 min-h-screen w-full overflow-hidden bg-white md:static md:z-0 md:min-h-0">
      <Link
        href={PATH.MY_ACHIEVEMENT}
        aria-label="나의 달성도 페이지로 돌아가기 버튼"
        className="absolute left-[26px] top-[18px] h-6 w-6 md:hidden"
      >
        <Image src={BACK} alt="나의 달성도 페이지로 돌아가기 버튼 아이콘" width={24} height={24} />
      </Link>
      <h1 className="mx-auto mt-[17.5px] h-[25px] w-[255px] self-stretch text-center text-lg font-semibold leading-7 text-secondary-grey-900 md:mb-[24px] md:mt-[72px] md:h-[28px] md:w-full md:text-left md:text-xl">
        프로필 수정
      </h1>
      <EditProfileForm initProfile={profile} />
    </div>
  );
};

export default MyPage;
