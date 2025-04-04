/**
 *
 * @function calculateUserLevel - 유저의 전체 레벨 단계를 판별하는 함수
 * @param totalCount - 유저가 달성한 전체 미션 개수 (number)
 * @returns - 시작 단계, 입문 단계, 초보 단계, 중수 단계, 고수 단계, 마스터 단계
 */
export const calculateUserLevel = (totalCount: number): string => {
  switch (true) {
    case totalCount >= 0 && totalCount < 25:
      return USER_LEVELS.START;
    case totalCount >= 25 && totalCount < 50:
      return USER_LEVELS.BEGINNER;
    case totalCount >= 50 && totalCount < 75:
      return USER_LEVELS.NOVICE;
    case totalCount >= 75 && totalCount < 100:
      return USER_LEVELS.INTERMEDIATE;
    case totalCount >= 100 && totalCount < 125:
      return USER_LEVELS.EXPERT;
    case totalCount >= 125:
      return USER_LEVELS.MASTER;
    default:
      return '알 수 없음'; // 예외 처리
  }
};

export const USER_LEVELS = {
  START: '시작 단계',
  BEGINNER: '입문 단계',
  NOVICE: '초보 단계',
  INTERMEDIATE: '중수 단계',
  EXPERT: '고수 단계',
  MASTER: '마스터 단계'
} as const;
