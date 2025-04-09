'use client';

import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import ProfileAvatar from '@/components/common/profile-avatar';
import type { InitProfile } from '@/types/components/edit-profile-form';
import type { Tables } from '@/types/supabase';

const ProfileBox = ({ initProfile }: InitProfile) => {
  const { profile, isProfileError } = useUserProfile();

  if (isProfileError) return;

  const displayProfile: Tables<'users'> = profile ? profile : initProfile;

  return (
    <section className="flex w-full flex-col items-center justify-center gap-3 rounded-md border p-5">
      <ProfileAvatar src={displayProfile.profile_image} />
      <p className="font-bold">{displayProfile.nickname}</p>
      <p>{displayProfile.email}</p>
    </section>
  );
};

export default ProfileBox;
