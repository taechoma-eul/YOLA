'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { AUTH } from '@/constants/auth-form';
import { PATH } from '@/constants/page-path';
import { TABLE } from '@/constants/supabase-tables-name';
import type { Tables } from '@/types/supabase';

const LAYOUT = 'layout';

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get(AUTH.EMAIL) as string,
    password: formData.get(AUTH.PASSWORD) as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) throw error;

  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

export const signup = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get(AUTH.EMAIL) as string,
    password: formData.get(AUTH.PASSWORD) as string,
    options: {
      data: {
        nickname: formData.get(AUTH.NICKNAME) as string
      }
    }
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) throw error;

  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

export const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    redirect(PATH.ERROR);
  }
  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

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

/**
 * public.users 테이블에서 현재 로그인 된 사용자의 프로필 정보를 불러옵니다.
 * 로그인 세션 정보가 존재하지 않으면 null 값을 반환합니다.
 * @returns { Tables<'users'> } - 현재 세션에 해당하는 users 테이블 row
 */
export const getUserProfile = async (): Promise<Tables<'users'> | null> => {
  const supabase = await createClient();
  const { userId } = await getUserSessionState();

  if (!userId) return null;

  const { data, error } = await supabase.from(TABLE.USERS).select('*').eq('id', userId).single();

  if (error) throw error;

  return data;
};

export const signInWithGoogle = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/api/auth/callback' // 서버 측 콜백 경로
    }
  });

  if (error) throw new Error(error.message);

  // Supabase가 리다이렉션 URL을 반환하면 클라이언트로 전달
  redirect(data.url); // OAuth 흐름 시작
};
