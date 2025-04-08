import type { Enums } from './supabase';

export type GonggamCategory = Enums<'categorys'>;

export type CategoryMapType = Record<GonggamCategory, string>;
export type slugToCategoryType = Record<string, GonggamCategory>;

export interface GonggamPost {
  id: number;
  user_id: string;
  category: GonggamCategory;
  title: string;
  content: string;
  created_at: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedPostsResponse {
  posts: GonggamPost[];
  pagination: PaginationInfo;
}
