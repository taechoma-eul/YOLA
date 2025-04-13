import type { Enums, Tables } from '@/types/supabase';

export type GonggamCategory = Enums<'categorys'>;

export type CategoryMapType = Record<GonggamCategory, string>;
export type SlugToCategoryType = Record<string, GonggamCategory>;

export type GonggamPost = Tables<'gonggam_posts'>;

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedPostsResponse {
  posts: GonggamPost[];
  pagination: PaginationInfo;
}

export interface GonggamPostMeta {
  likeCnt: number;
  commentCnt: number;
}
