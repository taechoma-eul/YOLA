import type { Enums, Tables } from '@/types/supabase';
import type { EnumCategories, TableComments, TableGonggamPosts, TableLikes } from '@/types/supabase-const';

export type GonggamCategory = Enums<'categories'>;

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
  id: string;
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

export interface UploadGonggamCommentParams {
  postId: number;
  comment: string;
}

export interface GonggamPostWithReaction extends TableGonggamPosts {
  likes: TableLikes[];
  comments: TableComments[];
}

//페이지네이션으로 나의 공감 게시글 조회할때 필요한 response 타입
export interface GetMyGonggamPostsResponse {
  data: GonggamPostWithCounts[];
  page: number;
  totalPages: number;
}

//gonggam_posts_with_counts 뷰 타입 정의
export type GonggamPostWithCounts = {
  id: number;
  category: EnumCategories;
  content: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  like_count: number | null;
  comment_count: number | null;
  // 조인된 users 테이블 필드 추가 (닉네임만)
  users: {
    nickname: string;
  };
};

export type SortBy = 'latest' | 'comments' | 'likes';
