import type { Tables } from './supabase';

export type LifePost = Tables<'life_posts'>;

export interface SoloLifeCardType {
  id: string;
  date: string;
  title: string;
  content: string;
  thumbnail: string; // 대표 이미지 (보통 첫 번째 이미지)
  imageUrls: string[]; // 전체 이미지 목록
  isMission: boolean;
  tags: string[];
}

export interface LifePostWithImageUrls extends LifePost {
  image_urls: string[];
}

//페이지네이션으로 라이프포스트 조회할때 필요한 response 타입
export interface GetLifePostsResponse {
  data: LifePostWithImageUrls[];
  page: number;
  totalPages: number;
}
