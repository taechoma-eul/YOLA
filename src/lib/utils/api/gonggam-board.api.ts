'use server';

import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { Enums } from '@/types/supabase';

const PAGE_SIZE = 5; // 페이지당 보여줄 게시글 수

/** getPaginatedGonggamPosts
 * 공감 게시글을 카테고리별 + 페이지네이션 기반으로 조회하는 함수
 *
 * @param category - 게시글 카테고리 (예: 일상공유, 꿀팁공유 등)
 * @param page - 현재 페이지 번호 (기본값: 1)
 * @returns posts: 해당 페이지의 게시글 목록
 *          pagination: 현재 페이지, 전체 페이지 수, 전체 게시글 수
 */
export const getPaginatedGonggamPosts = async (category: Enums<'categorys'>, page: number = 1) => {
  const supabase = await createClient();

  // Step 1: 전체 개수 카운트
  const { count, error: countError } = await supabase
    .from('gonggam_posts')
    .select('*', { count: 'exact', head: true }) // count만 select
    .eq('category', category);

  if (countError) throw new Error(countError.message);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Step 2: 해당 페이지 데이터 조회
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: posts, error: postsError } = await supabase
    .from('gonggam_posts')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (postsError) throw new Error(postsError.message);

  return {
    posts: posts ?? [],
    pagination: {
      currentPage: page,
      totalPages,
      totalCount
    }
  };
};
