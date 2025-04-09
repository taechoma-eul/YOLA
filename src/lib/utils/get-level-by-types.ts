import type { Mission, UsedTags } from '@/types/my-missions';

/**
 * @function getLevelsByTypes - 사용자가 완료한 미션 목록을 기반으로 각 타입(카테고리)별 현재 레벨 및 상태를 계산하는 함수
 * @param missionList - Mission[] 형식의 유저 미션 데이터
 * @returns 각 타입별 현재 레벨, 해당 레벨에서 완료한 미션 수, 다음 레벨까지 남은 개수 정보
 */
export const getLevelsByTypes = async ({ missionList }: { missionList: Mission[] }) => {
  //각 레벨당 미션 5개를 채워야 다음 레벨로 올라갈 수 있음
  const maxLevelCount = 5;

  //각 타입별로 레벨 1~5까지 완료한 미션 수를 저장할 배열
  const levelMap: Record<UsedTags, number[]> = {
    혼밥: [0, 0, 0, 0, 0],
    혼자여행: [0, 0, 0, 0, 0],
    혼놀: [0, 0, 0, 0, 0],
    청소: [0, 0, 0, 0, 0],
    갓생: [0, 0, 0, 0, 0]
  };

  //미션 데이터를 순회하면서 각 타입의 레벨별 개수 카운트
  missionList.forEach(({ type, level }) => {
    //level이 string이라 숫자로 변환
    const parsedLevel = parseInt(level as string, 10);
    //유효한 레벨(1~5)일 경우에만 카운트 반영
    if (!isNaN(parsedLevel) && parsedLevel >= 1 && parsedLevel <= 5) {
      // level은 '1', '2'처럼 문자열로 들어오는데, 배열은 0부터 시작해서 -1 해줌
      levelMap[type][parsedLevel - 1]++;
    }
  });

  const result = Object.entries(levelMap).map(([type, levels]) => {
    //각 타입별로 현재 레벨을 계산하기 위한 초기값 세팅
    let currentLevel = 1;

    //각 레벨마다 미션 5개 이상 완료했는지 확인하여 레벨 상승
    for (let i = 0; i < 5; i++) {
      if (levels[i] >= maxLevelCount) {
        currentLevel = i + 2; // ex. LV.1을 다 채웠다면 -> LV.2
      } else {
        break; // 못 채운 레벨이 나오면 중단
      }
    }

    const isMaster = currentLevel > 5; // LV.6 이상이면 'master'로 간주
    const activeLevelIndex = isMaster ? 4 : currentLevel - 1; // 현재 레벨 인덱스 계산

    return {
      type: type as UsedTags,
      currentLevel: isMaster ? 'master' : currentLevel,
      currentLevelDone: levels[activeLevelIndex],
      nextLevelLeft: isMaster ? 0 : maxLevelCount - levels[activeLevelIndex]
    };
  });

  return result;
};
