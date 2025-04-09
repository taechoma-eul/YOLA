import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import { QUERY_KEY } from '@/constants/query-keys';

export const useUserProfile = () => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
    error: profileFetchingError
  } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: QUERY_KEY.PROFILE
  });

  return { profile, isProfilePending, isProfileError, profileFetchingError };
};
