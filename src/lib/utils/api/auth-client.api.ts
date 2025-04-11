import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { CheckField } from '@/types/components/auth-form';
import { API, NEXT_SERVER_BASE_URL } from '@/constants/api-path';
import { FAIL } from '@/constants/messages';

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

/**
 * check-duplicate 라우트 핸들러에서 값을 fetching 해오는 api 함수입니다.
 * 중복 체크 시도 할 항목(FormData의 field name)과 검색하고자 하는 데이터 값을 넣으면 결과를 반환합니다.
 * 검색한 데이터의 유무에 따라 참 또는 거짓으로 값을 반환합니다.
 * @param { string } field - 중복 체크 할 항목(field 이름)
 * @param { string } value  - 중복 체크 할 값(바꾸고자 하는 데이터)
 * @returns { boolean } - 해당 하는 값이 이미 users 테이블에 있으면 true, 없으면 false
 */
export const fetchDuplicateCheck = async (field: string, value: string): Promise<boolean> => {
  try {
    const res = await fetch(
      `${NEXT_SERVER_BASE_URL}${API.DUPLICATE}?field=${field}&value=${encodeURIComponent(value)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || FAIL.DUPLICATE);
    }

    const { data } = await res.json();

    return !!data;
  } catch (error) {
    throw error;
  }
};
