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
      alert('프로필 업데이트 완료');
    },
    onError: (error) => {
      alert('프로필 업데이트 실패');
      throw error;
    }
  });

  return updateProfileMutate;
};
