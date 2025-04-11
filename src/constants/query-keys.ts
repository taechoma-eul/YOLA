import type { SortBy } from '@/types/gonggam-posts';

export const QUERY_KEY = {
  PROFILE: ['profile'],
  LIFE_POSTS_INFINITE: ['life-posts-infinite'],
  LIFE_POSTS: ['lifePosts'],
  GONGGAM_POSTS_INFINITE: (sortBy: SortBy) => ['gonggam-posts-infinite', sortBy]
};
