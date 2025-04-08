import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { GonggamPost } from '@/types/gonggam-posts';
import { TABLE } from '@/constants/supabase-tables-name';

/**
 * public.gonggam_posts 테이블에서 최신순 3개의 공감 게시글을 불러옵니다.
 * @returns { Promise<GonggamPost[]> } 공감 게시글 배열
 */
export const getGonggamPreviewList = async (): Promise<GonggamPost[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_popular_posts', { limit_count: 3 });

  if (error) throw error;

  return data ?? [];
};
