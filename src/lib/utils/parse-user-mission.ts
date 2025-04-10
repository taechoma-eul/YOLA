import type { Mission, UsedTags, UserMissionRow } from '@/types/my-missions';

/**
 * Supabase에서 가져온 미션 데이터 배열을 가공하여 레벨 계산 로직에 적합한 형태로 변환
 *
 * 사용 목적:
 * - Supabase에서 getUserMission API함수로 받아온 데이터에는 mission_list 안에 type, level 정보가 중첩되어 있음
 * - 이 데이터에서 { type, level } 형태만 뽑아서 배열로 반환
 * - 이후 레벨 계산 함수(getLevelsByTypes)에서 사용하기 위함
 *
 * 필터 조건:
 * - 미리 정의된 usedTags(혼밥, 혼자여행, 갓생, 혼놀, 청소)에 해당하는 type만 추출
 *
 * @param rawMissions Supabase의 user_mission 테이블에서 받아온 원본 미션 데이터 배열
 * @returns Mission[] - 레벨 계산에 사용할 수 있도록 변환된 미션 데이터
 */
export function parseUserMissions(rawMissions: UserMissionRow[]): Mission[] {
  // 우리가 사용하는 태그 타입들만 필터링
  const usedTags: UsedTags[] = ['혼밥', '혼자여행', '갓생', '혼놀', '청소'];

  return rawMissions
    .map((mission) => {
      const type = mission.mission_list.type;
      const level = mission.mission_list.level;

      // 사용하지 않는 태그는 제외
      if (!usedTags.includes(type as UsedTags)) return null;

      return {
        type: type as UsedTags,
        level: level
      };
    })
    .filter((mission): mission is Mission => mission !== null);
}
