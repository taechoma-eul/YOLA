import type { EnumCategories, TableComments, TableGonggamPosts, TableLikes, TableUsers } from '@/types/supabase-const';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedPostsResponse {
  posts: TableGonggamPosts[];
  pagination: PaginationInfo;
}

export type EachPaginatedGonggamPost = TableGonggamPosts & {
  writer: WriterProfile;
};

export interface PaginatedPostsResponseNew {
  posts: EachPaginatedGonggamPost[];
  pagination: PaginationInfo;
}

export interface GonggamPostMeta {
  likeCnt: number;
  commentCnt: number;
}

export interface WriterProfile {
  nickname: TableUsers['nickname'];
  profile_image?: TableUsers['profile_image'];
}

export interface GonggamPostDetailResponse extends TableGonggamPosts {
  users: WriterProfile;
}

export type GonggamPostDetail = GonggamPostDetailResponse & {
  images: string[];
};

export interface CommentWithUser extends Omit<TableComments, 'post_id' | 'user_id'> {
  writer: WriterProfile;
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
