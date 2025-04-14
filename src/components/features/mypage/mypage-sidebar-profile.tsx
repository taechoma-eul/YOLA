'use client';

import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import ProfileAvatar from '@/components/common/profile-avatar';
import type { InitProfile } from '@/types/components/edit-profile-form';

const ProfileBox = ({ initProfile }: InitProfile) => {
  const { profile, isProfileError, profileFetchingError } = useUserProfile(initProfile);

  if (isProfileError) throw profileFetchingError;

  return (
    <section className="flex w-full flex-col items-center justify-center gap-3 rounded-md border p-5">
      <ProfileAvatar src={profile.profile_image} />
      <p className="font-bold">{profile.nickname}</p>
      <p>{profile.email}</p>
    </section>
  );
};

export default ProfileBox;
