import type { Enums, Tables } from '@/types/supabase';

export type MissionType = Tables<'mission_list'>;

export type Level = Enums<'level'>;
export type UserLevel = Tables<'user_level'>;

export interface UserLevelByMissionType {
  userId: UserLevel['user_id'];
  decodedMission: string;
}

export type MissionMapType = Record<string, keyof UserLevel>;
export type MissionTag = '혼밥' | '혼자여행' | '혼놀' | '청소' | '갓생';
