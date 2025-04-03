import { createClient } from '@/lib/utils/supabase/supabase-server';
import { LifePost } from '@/types/life-post';

/**
 * Supabase에서 `life_posts` 테이블의 `로그인 한 User`가 작성한 게시글을 조회하는 함수
 *
 * @function getAllLifePostsById
 * @returns {Promise<LifePost[]>} id, created_at, user_id, content, mission_id
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 */
export const getAllLifePostsById = async (): Promise<LifePost[]> => {
  const supabase = await createClient();
  //로그인한 유저 id 조회 (임시용)
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (!user) throw userError;

  //로그인 한 유저의 작성 게시글 조회
  // ascending 정렬 _ false 내림차순, true 오름차순 정렬
  const { data: MyLifePosts, error } = await supabase
    .from('life_posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return MyLifePosts;
};

export const getLifePostsByMonth = async (month: string): Promise<LifePost[]> => {
  const supabase = await createClient();

  const getNextMonthFirstDay = (month: string): string => {
    const [y, m] = month.split('-').map(Number);
    const next = new Date(y, m); // 다음 달 1일
    const yyyy = next.getFullYear();
    const mm = String(next.getMonth() + 1).padStart(2, '0');
    return `${yyyy}-${mm}-01`;
  };

  const { data, error } = await supabase
    .from('life_posts')
    .select('*')
    .gte('created_at', `${month}-01`)
    .lt('created_at', getNextMonthFirstDay(month))
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return data ?? [];
};
