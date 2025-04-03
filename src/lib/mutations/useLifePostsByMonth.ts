import { LifePost } from '@/types/life-post';
import { useQuery } from '@tanstack/react-query';

export const useLifePostsByMonth = (month: string) => {
  return useQuery<LifePost[]>({
    queryKey: ['lifePosts', month],
    queryFn: async () => {
      const res = await fetch(`/api/life-posts?month=${month}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    }
  });
};
