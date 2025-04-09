import { getUserSessionState } from './auth-action';
import { MSG } from '@/constants/messages';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '../supabase/supabase-client';
import { GetMyGonggamPostsResponse } from '@/types/gonggam-posts';

/**
 * Supabase에서 `gonggam_posts` 테이블의 유저가 작성한 게시글 전체 조회 및 `comments`댓글, `likes`종아요를 같이 join 해서 가져오는 함수
 *
 * @function getMyGonggamPostsAll - 무한스크롤 구현을 위한 페이지네이션 데이터 조회
 * @returns {Promise<GetMyGonggamPostsResponse>} - data, page, totalPages
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 * @postsPerPage - 한번에 가져올 데이터의 개수 (현재 4개 지정)
 * @from - .range(from,to) 의 from
 * @to - .range(from,to) 의 to
 */
export const getMyGonggamPostsAll = async ({ page }: { page: number }): Promise<GetMyGonggamPostsResponse> => {
  const { userId } = await getUserSessionState();
  if (!userId) throw new Error(MSG.NEED_LOGIN);

  // 페이지당 게시물 수
  const postsPerPage = 4;
  const from = (page - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  const {
    data: MyGonggamPosts,
    error,
    count
  } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select(`*,likes(*),comments(*)`, { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count / postsPerPage) : 1;

  return {
    data: MyGonggamPosts,
    page,
    totalPages
  };
};
