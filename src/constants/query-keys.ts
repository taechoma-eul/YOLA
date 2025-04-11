export const QUERY_KEY = {
  PROFILE: ['profile'],
  LIFE_POSTS_INFINITE: ['life-posts-infinite'],
  LIFE_POSTS: (month?: string) => (month ? ['life-posts', month] : ['life-posts'])
};
// month 안쓸때 LIFE_POSTS()로 사용하고 month 쓸때는 LIFE_POSTS(month)로 사용
