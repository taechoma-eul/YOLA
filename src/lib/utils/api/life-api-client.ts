import { supabase } from '../supabase/supabase-client';
import { TABLE } from '@/constants/supabase-tables-name';
import type { LifePostWithImageUrls } from '@/types/life-post';

const LIFE_POSTS_TABLE = TABLE.LIFE_POSTS;

export const getLifePostsByMonth = async (month: string): Promise<LifePostWithImageUrls[]> => {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (!user) throw userError;

  const getNextMonthFirstDay = (month: string): string => {
    const [y, m] = month.split('-').map(Number);
    const next = new Date(y, m);
    const yyyy = next.getFullYear();
    const mm = String(next.getMonth() + 1).padStart(2, '0');
    return `${yyyy}-${mm}-01`;
  };

  const { data, error } = await supabase
    .from(LIFE_POSTS_TABLE)
    .select(
      `
      *,
      life_post_image_path (
        image_url
      )
    `
    )
    .eq('user_id', user.id)
    .gte('created_at', `${month}-01`)
    .lt('created_at', getNextMonthFirstDay(month))
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  const processed = (data ?? []).map((post: any) => ({
    ...post,
    image_urls: post.life_post_image_path?.map((img: any) => img.image_url) ?? []
  }));

  return processed;
};
