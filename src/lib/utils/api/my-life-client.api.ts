import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { getUserSessionState } from '@/lib/utils/api/auth-action';
import type { GetLifePostsResponse } from '@/types/life-post';

//무한스크롤 API
export const getLifePostsAll = async ({ page }: { page: number }): Promise<GetLifePostsResponse> => {
  const { userId } = await getUserSessionState();
  if (!userId) throw new Error();

  // 페이지당 게시물 수
  const postsPerPage = 8;
  const from = (page - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  const {
    data: MyLifePosts,
    error,
    count
  } = await supabase
    .from(TABLE.LIFE_POSTS)
    .select(`*,life_post_image_path(image_url)`, { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count / postsPerPage) : 1;

  const processed = (MyLifePosts ?? []).map((post) => ({
    ...post,
    image_urls: post.life_post_image_path?.map((img) => img.image_url) ?? []
  }));

  return {
    data: processed,
    page,
    totalPages
  };
};
