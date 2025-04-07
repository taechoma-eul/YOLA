/**
 *
 * @function calculateUserLevel - 유저의 전체 레벨 단계를 판별하는 함수
 * @param totalCount - 유저가 달성한 전체 미션 개수 (number)
 * @returns - 시작 단계, 입문 단계, 초보 단계, 중수 단계, 고수 단계, 마스터 단계
 */
export const calculateUserLevel = (totalCount: number): string => {
  if (totalCount >= 125) return USER_LEVELS.MASTER;
  if (totalCount >= 100) return USER_LEVELS.EXPERT;
  if (totalCount >= 75) return USER_LEVELS.INTERMEDIATE;
  if (totalCount >= 50) return USER_LEVELS.NOVICE;
  if (totalCount >= 25) return USER_LEVELS.BEGINNER;
  if (totalCount >= 0) return USER_LEVELS.START;
  return '알 수 없음';
};

export const USER_LEVELS = {
  START: '',
  BEGINNER: '입문',
  NOVICE: '초보',
  INTERMEDIATE: '중수',
  EXPERT: '고수',
  MASTER: '마스터'
} as const;
