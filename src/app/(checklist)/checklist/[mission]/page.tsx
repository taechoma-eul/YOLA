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

  // /** 레벨 세팅 */
  const { userId } = await getUserSessionState();
  if (userId) {
    userLevel = await getUserLevelByMission({ userId, decodedMission });
  }

  /** 단계별 미션 불러오기 */
  const missionList = await getMissionListByLevel(decodedMission as EnumChecklist, userLevel as EnumLevel);

  /** 유저 진척도 불러오기 */
  const missionIds = missionList.map((m) => m.id);
  let completedIds: number[] = [];

  if (userId) {
    completedIds = await getCompletedMissionIds({ userId, missionIds });
  }
  const missionListWithStatus = missionList.map((mission) => ({
    ...mission,
    completed: completedIds.includes(mission.id)
  }));

  const props = {
    decodedMission,
    userId,
    userLevel,
    progress: completedIds.length,
    missionList: missionListWithStatus
  };
  return <ChecklistClient {...props} />;
};

export default Checklist;
