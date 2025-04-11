import type { Database, Tables } from '@/types/supabase';

export interface GonggamPost extends Tables<'gonggam_posts'> {
  likes: Tables<'likes'>[];
  comments: Tables<'comments'>[];
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
  category: Database['public']['Enums']['categorys'];
  content: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  like_count: number | null;
  comment_count: number | null;
};

export type SortBy = 'latest' | 'comments' | 'likes';
