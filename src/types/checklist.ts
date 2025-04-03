export interface MissionType {
  id: number;
  content: string;
  type: string;
  level: string;
}

export type MissionListType = MissionType[];

interface UserMissionStatusType {
  completed_id: number;
  mission_list: Pick<MissionType, 'type' | 'level'>;
}

export type UserMissionStatusListType = UserMissionStatusType[];
