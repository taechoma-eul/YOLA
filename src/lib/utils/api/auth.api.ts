import { createClient } from '@/lib/utils/supabase/supabase-server';

/**
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자의 user_id(auth.uid)와 로그인 상태를 불러옵니다.
 * 세션이 존재하지 않는 경우 userId는 null을 반환하고, isLogin은 false를 반환합니다.
 * @returns { string | null, boolean } userId, isLogin
 */
export const getUserSessionState = async (): Promise<{
  userId: string | null;
  isLogin: boolean;
}> => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userId = user?.identities?.length !== undefined ? user.identities[0].user_id : null;

  const isLogin = !!userId;

  return { userId, isLogin };
};
