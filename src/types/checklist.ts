import { Database, Tables } from './supabase';

export type MissionType = Tables<'mission_list'>;

export type Level = Database['public']['Enums']['level'];
export type UserLevel = Database['public']['Tables']['user_level']['Row'];
export interface UserLevelByMissionType {
  userId: UserLevel['user_id'];
  decodedMission: string;
}

export type MissionMapType = Record<string, keyof Database['public']['Tables']['user_level']['Row']>;
export type MissionTag = '혼밥' | '혼자여행' | '혼놀' | '청소' | '갓생';
