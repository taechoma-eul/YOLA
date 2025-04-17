import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '../supabase/supabase-client';

/**
 * 선택한 게시글의 조회수를 클라이언트 컴포넌트에서 조회하기 위한 api 함수입니다.
 * @param { string } postId - 선택한 게시글의 id
 * @returns { number } - 선택한 게시글의 조회수
 */
export const getViewCountByClient = async (postId: string): Promise<number> => {
  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('view_count')
    .eq('id', Number(postId))
    .single();

  if (error) throw error;

  return data.view_count;
};
