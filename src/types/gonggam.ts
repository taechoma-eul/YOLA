import type { Enums, Tables } from '@/types/supabase';

export type GonggamCategory = Enums<'categorys'>;

export type CategoryMapType = Record<GonggamCategory, string>;
export type SlugToCategoryType = Record<string, GonggamCategory>;

export type GonggamPost = Tables<'gonggam_posts'>;
type GonggamComments = Tables<'comments'>;

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

export interface WriterProfileResponse {
  nickname: string;
  profileImage: string | null;
}

export interface GonggamPostDetail extends GonggamPost {
  profile: WriterProfileResponse;
  images: string[];
}
export interface CommentWithUser extends Omit<GonggamComments, 'post_id' | 'user_id'> {
  writer: WriterProfileResponse;
}
