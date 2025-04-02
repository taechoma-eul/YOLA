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
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자의 메타데이터를 불러옵니다.
 * 세션이 존재하지 않는(로그아웃) 경우 undefined을 반환합니다.
 * @returns {user_metadata} email, email_verified, nickname, uuid
 */
export const getUserMetadata = async () => {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user?.user_metadata;
};
