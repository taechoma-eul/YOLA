import { createClient } from '@/lib/utils/supabase/supabase-server';
import { TABLE } from '@/constants/supabase-tables-name';

/**
 * public.gonggam_posts 테이블에서 모든 공감 게시글을 불러옵니다.
 * @returns 모든 공감 게시글
 */
export const getGonggamPosts = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*, likes(*), comments(*)')
    .order('created_at', { ascending: false });

  if (error) throw new Error('공감게시글 불러오기를 실패했습니다.');

  return data;
};
