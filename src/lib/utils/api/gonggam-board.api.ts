'use server';

import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { Enums } from '@/types/supabase';

export const getGonggamPosts = async (category: Enums<'categorys'>) => {
  const supabase = await createClient();
  const { data, error: gonggamPostsErr } = await supabase.from('gonggam_posts').select('*').eq('category', category);
  if (gonggamPostsErr) throw new Error(gonggamPostsErr.message);
  return data;
};
