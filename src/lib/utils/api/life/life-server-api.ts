// src/lib/server/queries/get-server-life-posts-by-month-range.ts

import { TABLE } from '@/constants/supabase-tables-name';
import type { LifePostWithImageUrls } from '@/types/life-post';
import { createClient } from '../../supabase/supabase-server';
import { getUserSessionState } from '../auth/auth.api';

export const getServerLifePostsByMonth = async (month: string): Promise<LifePostWithImageUrls[]> => {
  const { userId, isLogin } = await getUserSessionState();
  if (!isLogin || !userId) throw new Error('로그인 필요');

  const supabase = await createClient();

  const start = `${month}-01`;
  const [y, m] = month.split('-').map(Number);
  const next = new Date(y, m);
  const end = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-01`;

  const { data, error } = await supabase
    .from(TABLE.LIFE_POSTS)
    .select(`*, life_post_image_path(image_url)`)
    .eq('user_id', userId)
    .gte('date', start)
    .lt('date', end)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((post) => ({
    ...post,
    image_urls: post.life_post_image_path?.map((i) => i.image_url) ?? []
  }));
};
