import { supabase } from '@/lib/utils/supabase/supabase-client';

/**
 * 클라이언트 호출용입니다.(클라이언트에서 호출하는 함수 내부 선언 포함)
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자의 user_id(auth.uid)와 로그인 상태를 불러옵니다.
 * 세션이 존재하지 않는 경우 userId는 null을 반환하고, isLogin은 false를 반환합니다.
 * @returns { string | null, boolean } userId, isLogin
 */
export const getUserSessionState = async (): Promise<{
  userId: string | null;
  isLogin: boolean;
}> => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userId = user?.identities?.length !== undefined ? user.identities[0].user_id : null;

  const isLogin = !!userId;

  return { userId, isLogin };
};

export const updateUserProfile = async (formData: { nickname: string; profile_image: string }): Promise<void> => {
  const { userId } = await getUserSessionState();

  if (userId === null) throw new Error('사용자 세션 정보가 존재하지 않습니다.');

  const { error } = await supabase
    .from('users')
    .update({ nickname: formData.nickname, profile_image: formData.profile_image })
    .eq('id', userId);

  if (error) throw new Error(error.message);
};
