import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import { QUERY_KEY } from '@/constants/query-keys';
import { Tables } from '@/types/supabase';

export const useUserProfile = (initProfile: Tables<'users'>) => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
    error: profileFetchingError
  } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: QUERY_KEY.PROFILE,
    initialData: initProfile
  });

  return { profile, isProfilePending, isProfileError, profileFetchingError };
};
