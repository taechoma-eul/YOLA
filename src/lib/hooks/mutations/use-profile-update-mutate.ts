import { getUserSessionState } from '@/lib/utils/api/auth-action';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfileMutate = () => {
  const queryClient = useQueryClient();

  const updateUserProfile = async (formData: { nickname: string; profile_image: string }): Promise<void> => {
    const { userId } = await getUserSessionState();
    if (userId === null) throw new Error('사용자 정보가 없습니다.');

    const { error } = await supabase
      .from('users')
      .update({ nickname: formData.nickname, profile_image: formData.profile_image })
      .eq('id', userId);

    if (error) {
      console.log('error', error);
      throw new Error(error.message);
    }
  };

  const { mutate: updateProfileMutate } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
      alert('프로필 업데이트 완료');
    },
    onError: (error) => {
      alert('프로필 업데이트 실패');
      console.log('error', error);
    }
  });

  return updateProfileMutate;
};
