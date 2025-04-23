import { notFound } from 'next/navigation';
import ChecklistClient from '@/components/features/checklist/checklist-client';
import { validMissionTags } from '@/constants/mission';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import {
  getCompletedMissionIds,
  getMissionListByLevel,
  getUserLevelByMission
} from '@/lib/utils/api/checklist/checklist.api';
import type { EnumChecklist, EnumLevel } from '@/types/supabase-const';

let userLevel = '1'; // default level (for 비로그인 사용자)

interface ChecklistProps {
  params: { mission: string };
}

const Checklist = async ({ params }: ChecklistProps) => {
  const decoded = decodeURIComponent(params.mission);

  if (!validMissionTags.includes(decoded as EnumChecklist)) {
    notFound(); // 유효한 미션타입이 아닌 경우 우회
  }
  const decodedMission = decoded as EnumChecklist;

  // 레벨 세팅
  const { userId } = await getUserSessionState();
  if (userId) {
    userLevel = await getUserLevelByMission({ userId, decodedMission });
  }

  // 마스터 레벨 처리
  const targetLevel = userLevel === 'master' && userId ? '5' : userLevel;
  const missionList = await getMissionListByLevel(decodedMission as EnumChecklist, targetLevel as EnumLevel);
  const missionIds = missionList.map((m) => m.id);

  // 완료된 미션 ID 가져오기
  let completedIds: number[] = [];
  if (userId) {
    completedIds = await getCompletedMissionIds({ userId, missionIds });
  }

  // 마스터 레벨이고 진행도가 0일 때는 전체 미션 수를 진행도로 설정
  const progress = userLevel === 'master' && completedIds.length === 0 ? missionList.length : completedIds.length;

  const missionListWithStatus = missionList.map((mission) => ({
    ...mission,
    completed: completedIds.includes(mission.id)
  }));

  const props = {
    decodedMission,
    userId,
    userLevel: targetLevel,
    progress,
    missionList: missionListWithStatus
  };

  return <ChecklistClient {...props} />;
};

export default Checklist;
