'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { UserMetadata } from '@supabase/supabase-js';
import { AUTH } from '@/constants/auth-form';
import { PATH } from '@/constants/page-path';

const LAYOUT = 'layout';

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get(AUTH.EMAIL) as string,
    password: formData.get(AUTH.PASSWORD) as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error.message);
    redirect(PATH.ERROR);
  }

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

  if (error) {
    console.log(error.message);
    redirect(PATH.ERROR);
  }

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
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자의 메타데이터 정보를 불러옵니다.
 * 세션이 존재하지 않는 경우 null을 반환합니다.
 * @returns { UserMetadata | null } userMetadata
 */
export const getUserMetadata = async (): Promise<UserMetadata | null> => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userMetadata = user !== null ? user.user_metadata : null;

  return userMetadata;
};

/**
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자의 user_id(auth.uid)를 불러옵니다.
 * 세션이 존재하지 않는 경우 null을 반환합니다.
 * @returns { string | null } user_id
 */
export const getUserId = async (): Promise<string | null> => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userId = user?.identities?.length !== undefined ? user.identities[0].user_id : null;

  return userId;
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
