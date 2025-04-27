import type {
  TableComments,
  TableGonggamPostWithCounts,
  TableGonggamPosts,
  TableLikes,
  TableUsers
} from '@/types/supabase-const';

export interface PaginatedPostsResponse {
  posts: GonggamPostDetailResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface WriterProfile {
  id?: string;
  nickname: TableUsers['nickname'];
  profile_image?: TableUsers['profile_image'];
}

export interface GonggamPostDetailResponse extends TableGonggamPostWithCounts {
  writer: WriterProfile;
  imageUrl: string;
}

export interface GonggamPostDetail extends GonggamPostDetailResponse {
  images: string[];
}

export interface GonggamPostDetailWithoutCounts extends TableGonggamPosts {
  writer: WriterProfile;
  images: string[];
}

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
export interface GonggamPostWithCounts extends TableGonggamPostWithCounts {
  users: {
    nickname: string;
  };
}

export type SortBy = 'latest' | 'comments' | 'likes';
