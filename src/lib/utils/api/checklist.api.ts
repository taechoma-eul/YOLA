import { NUMBER } from '@/constants/magic-number';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { MissionType, UserMissionStatusListType } from '@/types/checklist';
import { Database } from '@/types/supabase';

type UserLevel = Database['public']['Tables']['user_level']['Row'];
interface UserLevelByMissionType {
  userId: UserLevel['user_id'];
  decodedMission: string;
}

type MissionMapType = Record<string, keyof Database['public']['Tables']['user_level']['Row']>;

const INVALID_MISSION_TYPE = '유효하지 않은 미션 이름입니다';

/** getUserLevelByMission: 유저 레벨 정보 불러오기
 *
 * @async
 * @function getUserLevelByMission
 * @param {UserLevelByMissionType} params - 유저 ID와 미션 한글 이름을 포함한 객체
 * @param {string} params.userId - 레벨 정보를 조회할 유저의 ID
 * @param {string} params.decodedMission - 한글 미션 이름 (예: '혼밥', '청소', '혼자놀기' 등)
 * @returns {Promise<number>} 해당 미션에 대한 유저의 현재 레벨 (문자열 → 숫자 변환, 기본값은 1)
 * @throws {Error} 미션 이름이 유효하지 않거나 Supabase 쿼리 실행 중 오류가 발생할 경우 에러 발생
 */
export const getUserLevelByMission = async ({ userId, decodedMission }: UserLevelByMissionType) => {
  const supabase = await createClient();
  const missionTypeMap: MissionMapType = {
    혼밥: 'meal',
    혼놀: 'play',
    혼자여행: 'travel',
    청소: 'clean',
    갓생: 'goat'
  };

  const col = missionTypeMap[decodedMission];
  if (!col) {
    throw new Error(`${INVALID_MISSION_TYPE}: ${decodedMission}`);
  }
  const { data, error } = (await supabase.from('user_level').select(col).eq('user_id', userId).single()) as {
    data: Pick<UserLevel, typeof col> | null;
    error: any;
  };
  if (error) throw new Error(error.message);

  return String(data?.[col] ?? '1');
};

// Supabase에서 생성된 전체 태그 ENUM 타입
type AllTags = Database['public']['Enums']['tags'];
export type Level = Database['public']['Enums']['level'];

// 미션 태그 정의
export type MissionTag = '혼밥' | '혼자여행' | '혼놀' | '청소' | '갓생';

/** getMissionListByLevel: 미션 리스트 데이터 불러오기 (미션 타입 + 유저 레벨 기반)
 *
 * @async
 * @function getMissionListByLevel
 * @param {string} mission - 조회할 미션의 `type` 값 (예: '혼자놀기')
 * @param {number} userLevel - 유저의 현재 레벨 값 (예: 1, 2, 3 등)
 * @returns {Promise<MissionType[]>} `mission_list` 테이블에서 해당 타입과 레벨에 맞는 미션 배열
 * @throws {Error} Supabase 쿼리 실행 중 오류 발생 시 throw Error
 */
export const getMissionListByLevel = async (mission: MissionTag, userLevel: Level): Promise<MissionType[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('mission_list').select('*').eq('type', mission).eq('level', userLevel);

  if (error) throw new Error(error.message);
  return data;
};

// /** 유저의 미션 현황 불러오기
//  *
//  * @param {string} userId - 조회할 사용자의 ID
//  * @returns {Promise<UserMissionStatusListType>} - 사용자의 미션 현황 리스트
//  * @throws {Error} - 데이터 조회 중 오류 발생 시 예외 처리
//  */
// export const getUserMissionStatus = async ({
//   userId,
//   type
// }: {
//   userId: string;
//   type: string;
// }): Promise<UserMissionStatusListType> => {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from('user_mission')
//     .select('completed_id, mission_list!inner(type, level)')
//     .eq('user_id', userId)
//     .eq('mission_list.type', type)
//     .not('mission_list', 'is', null);

//   if (error) throw new Error(error.message);

//   const transformedData = data.map((item: any) => ({
//     completed_id: item.completed_id,
//     mission_list:
//       Array.isArray(item.mission_list) && item.mission_list.length > NUMBER.ZERO
//         ? item.mission_list[0]
//         : item.mission_list
//   }));
//   return transformedData;
// };
