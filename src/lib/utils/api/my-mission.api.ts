import { createClient } from '@/lib/utils/supabase/supabase-server';

/**
 * Supabase에서 `user_mission` 테이블의 `로그인 한 User`가 달성한 미션 전부를 조회하는 함수
 *
 * @function getUserMissionById
 * @returns  id, created_at, user_id, completed_id, mission_list: {type, level}
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 */
export const getUserMission = async () => {
  const supabase = await createClient();
  //로그인한 유저 id 조회 (임시용)
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (!user) throw userError;

  // 로그인한 유저의 완료 미션과, mission_list 테이블에서 id와 type을 조인하여 조회
  const { data: UserMissions, error } = await supabase
    .from('user_mission')
    .select(`*,mission_list(type, level)`)
    .eq('user_id', user.id);

  if (error) throw new Error(error.message);
  return UserMissions;
};

/**
 * Supabase에서 `user_level` 테이블의 카테고리별 레벨 조회하는 함수
 *
 * @function getUserMissionLevels
 * @returns  id, user_id, meal, play, travel, clean, goat
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 */
export const getUserMissionLevels = async () => {
  const supabase = await createClient();
  //로그인한 유저 id 조회 (임시용)
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (!user) throw userError;

  // 로그인한 유저의 레벨 조회
  const { data: UserMissionsLevels, error } = await supabase.from('user_level').select('*').eq('user_id', user.id);

  if (error) throw new Error(error.message);
  return UserMissionsLevels[0];
};
