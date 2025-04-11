import { createClient } from '@/lib/utils/supabase/supabase-server';
import { TABLE } from '@/constants/supabase-tables-name';
import { Field } from '@/types/auth-form-field';

/**
 * 서버 환경에서만 동작합니다. 클라이언트에서 호출시 에러 발생합니다.
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
 * 클라이언트 컴포넌트에서 사용하기 위해 라우터 핸들러에서 호출하는 서버 전용 함수입니다.
 * users 테이블에서 nickname, 혹은 email 컬럼에 변경하고자 하는 데이터 값이 있는지 조회하는 api 함수입니다.
 * 검색한 데이터가 이미 존재하면 { 컬럼 이름 : 검색 시도한 데이터 값 } 형태로 반환되고, 없으면 null이 반환됩니다.
 * @param { string } field - 중복 체크 할 항목(field 이름)
 * @param { string } value  - 중복 체크 할 값(바꾸고자 하는 데이터)
 * @returns { Promise<{ email: string } | { nickname: string } | null> } - 해당 하는 값이 이미 users 테이블에 있으면 true, 없으면 false
 */
export const getDuplicateCheckData = async (
  field: Field,
  value: string
): Promise<{ email: string } | { nickname: string } | null> => {
  const supabase = await createClient();

  const { data } = await supabase.from(TABLE.USERS).select(field).eq(field, value).single();

  return data;
};
