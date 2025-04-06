import { Tables } from './supabase';

export type MissionType = Tables<'mission_list'>;

// interface UserMissionStatusType {
//   completed_id: number;
//   mission_list: Pick<MissionType, 'type' | 'level'>;
// }

// export type UserMissionStatusListType = UserMissionStatusType[];
