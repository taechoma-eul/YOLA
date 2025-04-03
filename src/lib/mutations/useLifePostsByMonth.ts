import { useQuery } from '@tanstack/react-query';
import { SoloLifeRaw } from '@/types/solo-life';
import { supabase } from '../utils/supabase/supabase-client';

export const useLifePostsByMonth = (month: string) => {
  return useQuery<SoloLifeRaw[]>({
    queryKey: ['lifePosts', month],
    queryFn: async () => {
      // 이부분은 추후에 지은님 Api랑 합칠거같습니다.
      const { data, error } = await supabase
        .from('life_posts')
        .select('*')
        .gte('created_at', `${month}-01`)
        .lt('created_at', getNextMonthFirstDay(month))
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data ?? [];
    }
  });
};

const getNextMonthFirstDay = (month: string): string => {
  const [y, m] = month.split('-').map(Number);
  const next = new Date(y, m); // 다음 달 1일
  const yyyy = next.getFullYear();
  const mm = String(next.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${mm}-01`;
};
