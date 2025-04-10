import { Database } from '@/types/supabase';

/**
 * 우리가 사용하는 5개의 미션 카테고리만 명시적으로 타입화
 */
export type UsedTags = '혼밥' | '혼자여행' | '갓생' | '혼놀' | '청소';

/**
 * Supabase에서 mission_list 테이블의 Row 전체 타입
 */
export type RawMissionsFromSupabase = Database['public']['Tables']['mission_list']['Row'];

/**
 * Supabase의 user_mission 테이블에서 join된 mission_list 컬럼 구조만 따로 정의
 * - mission_list 안에는 type과 level이 string으로 들어있음
 */
export type UserMissionRow = {
  mission_list: {
    type: string;
    level: string;
  };
};

/**
 * getLevelsByTypes 유틸 함수에 전달할 미션 데이터 타입
 * - UsedTags를 기반으로 정확한 타입 보장
 * - level은 string으로 유지 (계산 시 parseInt로 처리)
 */
export type Mission = {
  type: UsedTags;
  level: string;
};
