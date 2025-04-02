import { createClient } from '@/lib/utils/supabase/supabase-server';

// 전체 라이프 리스트 가져오기
export const fetchAllLifeList = async () => {
  const supabase = await createClient();
  const { data: lifePosts, error } = await supabase.from('life_posts').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return lifePosts;
};
