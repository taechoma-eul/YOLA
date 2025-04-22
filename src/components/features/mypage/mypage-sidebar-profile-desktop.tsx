'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileAvatar from '@/components/features/mypage/profile-avatar';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import type { InitProfile } from '@/types/auth-form';

const ProfileBoxDesktop = ({ initProfile }: InitProfile) => {
  //현재 경로 가져오기
  const pathname = usePathname();
  const { profile, isProfileError, profileFetchingError } = useUserProfile(initProfile);

  if (isProfileError) throw profileFetchingError;

  return (
    <section className="flex flex-col items-center justify-start">
      {/* 프로필 영역 */}
      <ProfileAvatar src={profile.profile_image} size={172} className="rounded-2xl" />
      <p className="text-xl font-semibold text-secondary-grey-900">{profile.nickname}</p>
      <p className="mb-[20px] mt-[8px] text-base text-secondary-grey-700">{profile.email}</p>

      {/* 프로필 수정 버튼 */}
      <Link href={PATH.MYPAGE}>
        <CustomButton variant="grey" size="edit-profile" className="mb-[37px] h-[36px] text-sm">
          프로필 수정
        </CustomButton>
      </Link>

      {/* 구분선 */}
      <div className="mb-[12px] h-[1px] w-[172px] bg-secondary-grey-400" />
      {/* 마이페이지 탭 3개 */}
      <div className="flex w-full flex-col">
        <Link
          href={PATH.MY_LIFE_LIST}
          className={`py-[16px] text-lg ${
            pathname === PATH.MY_LIFE_LIST ? 'font-semibold text-primary-orange-600' : 'text-secondary-grey-600'
          }`}
        >
          혼자 라이프 기록
        </Link>
        <Link
          href={PATH.MY_GONGGAM_POST_LIST}
          className={`py-[16px] text-lg ${
            pathname === PATH.MY_GONGGAM_POST_LIST ? 'font-semibold text-primary-orange-600' : 'text-secondary-grey-600'
          }`}
        >
          작성 공감글
        </Link>
        <Link
          href={PATH.MY_ACHIEVEMENT}
          className={`py-[16px] text-lg ${
            pathname === PATH.MY_ACHIEVEMENT ? 'font-semibold text-primary-orange-600' : 'text-secondary-grey-600'
          }`}
        >
          나의 현황
        </Link>
      </div>
    </section>
  );
};

export default ProfileBoxDesktop;
