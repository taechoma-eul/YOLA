'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { getUserSessionState } from '@/lib/utils/api/auth.api';
import type { Tables } from '@/types/supabase';
import { AUTH } from '@/constants/auth-form';
import { PATH } from '@/constants/page-path';
import { TABLE } from '@/constants/supabase-tables-name';

const LAYOUT = 'layout';

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get(AUTH.EMAIL) as string,
    password: formData.get(AUTH.PASSWORD) as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === 'Invalid login credentials') throw new Error('이메일 또는 비밀번호 오류입니다.');
    return;
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
 * public.users 테이블에서 현재 로그인 된 사용자의 프로필 정보를 불러옵니다.
 * 로그인 세션 정보가 존재하지 않으면 null 값을 반환합니다.
 * @returns { Tables<'users'> } - 현재 세션에 해당하는 users 테이블 row
 */
export const getUserProfile = async (): Promise<Tables<'users'>> => {
  const supabase = await createClient();
  try {
    const { userId } = await getUserSessionState();
    if (userId === null) throw new Error('사용자 세션 정보가 존재하지 않습니다.');

    const { data, error } = await supabase.from(TABLE.USERS).select('*').eq('id', userId).single();

    if (error) throw new Error('사용자 프로필 정보를 받아오는 데 실패했습니다.');

    return data;
  } catch (error) {
    throw error;
  }
};

export const getDuplicateCheckData = async (field: string, value: string) => {
  const supabase = await createClient();

  const { data } = await supabase.from('users').select(field).eq(field, value).single();

  return data;
};
