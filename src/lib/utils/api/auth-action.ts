'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AUTH } from '@/constants/auth-form';
import { FAIL } from '@/constants/messages';
import { PATH } from '@/constants/page-path';
import { TABLE } from '@/constants/supabase-tables-name';
import { getUserSessionState } from '@/lib/utils/api/auth.api';
import { createClient } from '@/lib/utils/supabase/supabase-server';

const LAYOUT = 'layout';

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.get(AUTH.EMAIL) as string,
    password: formData.get(AUTH.PASSWORD) as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === 'Invalid login credentials') throw new Error(FAIL.LOGIN);
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
 * 사용자가 프로필 정보를 업데이트 하는 api 함수입니다.
 * 현재 로그인 된 사용자 아이디를 받아와서 아이디에 해당하는 row를 파라미터로 받은 정보로 변경합니다.
 * @param { { string, string } } - 변경할 닉네임과 프로필 이미지기 업로드 된 주소
 * @returns { Tables<'users'> } - 현재 세션에 해당하는 users 테이블 row
 */
export const updateUserProfile = async (formData: { nickname: string; profile_image: string }): Promise<void> => {
  const supabase = await createClient();
  const { userId } = await getUserSessionState();

  if (userId === null) throw new Error(FAIL.SESSION);

  const { error } = await supabase
    .from(TABLE.USERS)
    .update({ nickname: formData.nickname, profile_image: formData.profile_image })
    .eq('id', userId);

  if (error) throw new Error(error.message);
};
