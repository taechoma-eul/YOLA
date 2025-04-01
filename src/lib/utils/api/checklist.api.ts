import { createClient } from '../supabase/supabase-server';

/**
 * Supabase에서 `mission_list` 테이블의 고유한 `type` 값을 조회하는 함수
 *
 * @async
 * @function getUniqueMissionType
 * @returns {Promise<Array<{ type: string }> | null>} `type` unique value 배열
 * @throws {Error} Supabase 쿼리 실행 중 오류에 대해 콘솔 로그 출력 & 빈 배열 반환
 */
export const getUniqueMissionType = async (): Promise<string[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('mission_list').select('type');
  if (error) {
    console.error(error);
    return [];
  }

  const uniqueTypes = Array.from(new Set<string>(data.map((item) => item.type)));
  return uniqueTypes;
};
