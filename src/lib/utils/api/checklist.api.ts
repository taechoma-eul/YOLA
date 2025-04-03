import { NUMBER } from '@/constants/magic-number';
import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { MissionListType, UserMissionStatusListType } from '@/types/checklist';

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
  const { data, error } = await supabase.from(TABLE.MISSION_LIST).select('type');
  if (error) {
    console.error(error);
    return [];
  }

  const uniqueTypes = Array.from(new Set<string>(data.map((item) => item.type)));
  return uniqueTypes;
};

/** 미션 리스트 데이터 불러오기
 *
 * @async
 * @function getMissionList
 * @param {string} mission - 조회할 미션의 `type` 값
 * @returns {Promise<MissionListType>} `mission_list` 테이블에서 필터링된 데이터 배열
 * @throws {Error} Supabase 쿼리 실행 중 오류 발생 시 throw Error
 */
export const getMissionList = async (mission: string): Promise<MissionListType> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from(TABLE.MISSION_LIST).select('*').eq('type', mission);

  if (error) throw new Error(error.message);
  return data;
};

/** 유저의 특정 타입 체크리스트 미션 현황을 불러오는 함수
 *
 * @param {string} params.userId - 조회할 사용자의 ID
 * @param {string} params.type - 조회할 미션 타입
 * @returns {Promise<UserMissionStatusListType>} - 사용자의 미션 현황 리스트
 * @throws {Error} - 데이터 조회 중 오류 발생 시 예외 처리
 */
export const getUserMissionStatus = async ({
  userId,
  type
}: {
  userId: string;
  type: string;
}): Promise<UserMissionStatusListType> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE.USER_MISSION)
    .select(`completed_id, ${TABLE.MISSION_LIST}!inner(type, level)`)
    .eq('user_id', userId)
    .eq(`${TABLE.MISSION_LIST}.type`, type)
    .not(TABLE.MISSION_LIST, 'is', null);

  if (error) throw new Error(error.message);

  const transformedData = data.map((item: any) => ({
    completed_id: item.completed_id,
    mission_list:
      Array.isArray(item.mission_list) && item.mission_list.length > NUMBER.ZERO
        ? item.mission_list[0]
        : item.mission_list
  }));
  return transformedData;
};
