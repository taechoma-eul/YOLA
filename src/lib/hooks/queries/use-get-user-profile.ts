import { getUserProfile } from '@/lib/utils/api/auth-action';
import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError
  } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: ['user']
  });

  return { profile, isProfilePending, isProfileError };
};
