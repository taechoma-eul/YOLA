import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '@/lib/utils/api/update-user-profile.api';
import { QUERY_KEY } from '@/constants/query-keys';

export const useUpdateProfileMutate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PROFILE
      });
    },
    onError: (error) => {
      throw error;
    }
  });

  return updateProfileMutate;
};
