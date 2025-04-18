import type { SortBy } from '@/types/gonggam';

export const QUERY_KEY = {
  PROFILE: ['profile'],
  LIFE_POSTS_INFINITE: ['life-posts-infinite'],
  GONGGAM_POSTS_INFINITE: (sortBy: SortBy) => ['gonggam-posts-infinite', sortBy],
  LIFE_POSTS: (month?: string, missionId?: string) => {
    const key = ['life-posts'];
    if (month) key.push(month);
    if (missionId) key.push(missionId);
    return key;
  },
  GONGGAM_COMMENTS: (postId: number) => ['gonggam-comments', postId],
  MISSIONS: () => ['missions'],
  GONGGAM_POSTS: () => ['gonggam-posts']
};
// month 안쓸때 LIFE_POSTS()로 사용하고 month 쓸때는 LIFE_POSTS(month)로 사용
