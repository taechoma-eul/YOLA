import { supabase } from '../supabase/supabase-client';

// 전체 라이프 리스트 가져오기
export const fetchAllLifeList = async () => {
  const { data: lifePosts, error } = await supabase.from('life_posts').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return lifePosts;
};
