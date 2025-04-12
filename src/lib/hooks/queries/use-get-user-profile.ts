import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { Tables } from '@/types/supabase';
import { fetchUserProfile } from '@/lib/utils/api/auth-client.api';

export const useUserProfile = (initProfile: Tables<'users'>) => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
    error: profileFetchingError
  } = useQuery({
    queryFn: fetchUserProfile,
    queryKey: QUERY_KEY.PROFILE,
    initialData: initProfile
  });

  return { profile, isProfilePending, isProfileError, profileFetchingError };
};
