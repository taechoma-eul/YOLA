'use server';

import { createClient } from '@/lib/utils/supabase/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error.message);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const signup = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        nickname: formData.get('nickname') as string
      }
    }
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    redirect('/error');
  }
  revalidatePath('/', 'layout');
  redirect('/');
};

/**
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자 세션 정보를 불러옵니다.
 * 세션이 존재하지 않는(로그아웃) 경우 undefined을 반환합니다.
 * @returns user info
 */
export const getUserInfo = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error) throw new Error('유저 세션 정보가 없습니다.');

  return user;
};

/**
 * 현재 로그인 된 사용자 uuid를 불러옵니다.
 * 세션이 존재하지 않는(로그아웃) 경우 undefined을 반환합니다.
 * @returns user_id
 */
export const getUserId = async () => {
  try {
    const data = await getUserInfo();
    return data?.id;
  } catch (error) {
    throw new Error(' 유저 아이디 정보가 없습니다.');
  }
};

export const signInWithGoogle = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/api/auth/callback' // 서버 측 콜백 경로
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  // Supabase가 리다이렉션 URL을 반환하면 클라이언트로 전달
  redirect(data.url); // OAuth 흐름 시작
};
