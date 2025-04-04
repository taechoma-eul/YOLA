import type { Tables } from './supabase';

export type LifePost = Tables<'life_posts'>;

export interface SoloLifeCardType {
  id: string;
  date: string;
  title: string;
  content: string;
  img: string;
  isMission: boolean;
}
