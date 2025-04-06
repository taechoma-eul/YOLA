import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import type { Tables } from '@/types/supabase';

export const useUserProfile = (initProfile: Tables<'users'>) => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError
  } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: ['user'],
    initialData: initProfile
  });

  return { profile, isProfilePending, isProfileError };
};
