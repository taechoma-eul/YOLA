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
      throw new Error('사용자 정보 변경에 실패했습니다.');
    }
  });

  return updateProfileMutate;
};
