import { createClient } from '@/lib/utils/supabase/supabase-server';
import { TABLE } from '@/constants/supabase-tables-name';
import { getCompletedMissionIds, getMissionListByLevel } from '@/lib/utils/api/checklist.api';
import { MSG } from '@/constants/messages';
import type { MissionTag, MissionType } from '@/types/checklist';

interface DropdownParams {
  userId: string;
  missionId: number;
}

export async function getMissionDropdownData({ userId, missionId }: DropdownParams): Promise<{
  missions: MissionType[];
  completedIds: number[];
}> {
  const supabase = await createClient();

  // 1. missionId로 type, level 조회
  const { data: meta, error: metaError } = await supabase
    .from(TABLE.MISSION_LIST)
    .select('type, level')
    .eq('id', missionId)
    .single();

  if (metaError) throw new Error(metaError.message);
  if (!meta) throw new Error(MSG.NOTFOUND_MISSION_INFO);

  const { type, level } = meta;

  // 2. 해당 type + level의 미션 리스트
  const missions = await getMissionListByLevel(type as MissionTag, level);

  // 3. 유저가 완료한 미션 ID
  const completedIds = await getCompletedMissionIds({
    userId,
    missionIds: missions.map((m) => m.id)
  });

  return {
    missions,
    completedIds
  };
}
