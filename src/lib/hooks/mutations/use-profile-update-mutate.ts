import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { updateUserProfile } from '@/lib/utils/api/auth-action';

export const useUpdateProfileMutate = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateUserProfile, // 서버 액션
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
