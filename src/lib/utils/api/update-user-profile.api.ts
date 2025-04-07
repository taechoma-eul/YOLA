import { supabase } from '@/lib/utils/supabase/supabase-client';
import { getUserSessionState } from '@/lib/utils/api/auth-action';

export const updateUserProfile = async (formData: { nickname: string; profile_image: string }): Promise<void> => {
  const { userId } = await getUserSessionState();
  if (userId === null) throw new Error('사용자 정보가 없습니다.');

  const { error } = await supabase
    .from('users')
    .update({ nickname: formData.nickname, profile_image: formData.profile_image })
    .eq('id', userId);

  if (error) throw new Error(error.message);
};
