import type { Database } from './supabase';

export type LifePost = Database['public']['Tables']['life_posts']['Row'];
export interface SoloLifeCardType {
  id: string;
  date: string;
  title: string;
  content: string;
  img: string;
  isMission: boolean;
}
