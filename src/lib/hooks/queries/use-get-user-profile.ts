import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import type { Tables } from '@/types/supabase';
import { QUERY_KEY } from '@/constants/query-keys';

export const useUserProfile = (initProfile: Tables<'users'>) => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError
  } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: QUERY_KEY.PROFILE,
    initialData: initProfile
  });

  return { profile, isProfilePending, isProfileError };
};
