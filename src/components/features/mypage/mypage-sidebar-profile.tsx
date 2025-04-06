'use client';

import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import ProfileAvatar from '@/components/common/profile-avatar';
import type { Tables } from '@/types/supabase';

const ProfileBox = ({ initProfile }: { initProfile: Tables<'users'> }) => {
  const { profile, isProfilePending, isProfileError } = useUserProfile();

  if (!profile || isProfileError || isProfilePending)
    // 로딩중일 땐 서버에서 받은 초기 데이터로 셋팅
    return (
      <section className="flex w-full flex-col items-center justify-center gap-3 rounded-md border p-5">
        <ProfileAvatar src={initProfile.profile_image} />
        <p className="font-bold">{initProfile.nickname}</p>
        <p>{initProfile.email}</p>
      </section>
    );

  return (
    <section className="flex w-full flex-col items-center justify-center gap-3 rounded-md border p-5">
      <ProfileAvatar src={profile.profile_image} />
      <p className="font-bold">{profile.nickname}</p>
      <p>{profile.email}</p>
    </section>
  );
};

export default ProfileBox;
