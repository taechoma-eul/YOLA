import { getUserMissionStatus } from '@/lib/utils/api/checklist.api';
import { NUMBER } from '@/constants/magic-number';

/**
 * getUserLevelAndProgress: 사용자의 체크리스트 레벨과 현재 레벨의 진행도를 반환하는 함수
 *
 * @param userId 사용자의 고유 ID (로그인하지 않은 경우 undefined)
 * @param type 체크리스트 유형
 * @returns currentLevel: 현재 유저의 체크리스트 레벨, progress: 현재 레벨에서 완료한 미션 개수
 */
export const getUserLevelAndProgress = async (userId: string | undefined, type: string) => {
  // 로그인하지 않은 경우 기본값 반환
  if (!userId) {
    return { currentLevel: NUMBER.DEFAULT_LEVEL, progress: 0 };
  }

  // 유저가 해당 체크리스트에서 완료한 미션 정보 가져오기
  const userMissionStatus = await getUserMissionStatus({ userId, type });

  // 유저의 현재 체크리스트 레벨 계산: 완료한 미션이 없을 경우 DEFAULT_LEVEL
  const currentLevel =
    userMissionStatus.length > NUMBER.ZERO
      ? Math.ceil(userMissionStatus.length / NUMBER.LEVEL_THRESHOLD)
      : NUMBER.DEFAULT_LEVEL;

  // 유저가 완료한 미션 개수: 현재 레벨과 일치하는 미션 개수 필터링하여 카운트
  const progress = userMissionStatus.filter((mission) => +mission.mission_list.level === currentLevel).length;

  return { currentLevel, progress };
};
