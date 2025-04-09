import { Tables } from '@/types/supabase';

export interface GonggamPost extends Tables<'gonggam_posts'> {
  likes: Tables<'likes'>[];
  comments: Tables<'comments'>[];
}

//페이지네이션으로 나의 공감 게시글 조회할때 필요한 response 타입
export interface GetMyGonggamPostsResponse {
  data: GonggamPost[];
  page: number;
  totalPages: number;
}
