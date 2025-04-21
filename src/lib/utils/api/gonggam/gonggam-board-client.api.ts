import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { EnumCategories, TableGonggamPosts } from '@/types/supabase-const';
import {
  GonggamPostMeta,
  // PaginatedPostsResponse,
  PaginatedPostsResponseNew
  // WriterProfileResponse
} from '@/types/gonggam';

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

/** getPaginatedGonggamPostsByClient
 * 공감 게시글을 카테고리별 + 페이지네이션 기반으로 조회하는 클라이언트 전용 함수
 *
 * @param category - 게시글 카테고리 (예: 일상공유, 꿀팁공유 등)
 * @param page - 현재 페이지 번호 (기본값: 1)
 * @returns posts: 해당 페이지의 게시글 목록
 *          pagination: 현재 페이지, 전체 페이지 수, 전체 게시글 수
 */
const PAGE_SIZE = 5; // 페이지당 보여줄 게시글 수

export const getPaginatedGonggamPostsByClient = async (
  category: EnumCategories,
  page: number = 1
): Promise<PaginatedPostsResponseNew> => {
  // Step 1: 전체 개수 카운트
  const { count, error: countError } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*', { count: 'exact' }) // count만 select
    .eq('category', category);

  if (countError && !count) throw new Error(countError.message);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Step 2: 해당 페이지 데이터 조회와 작성자 정보 같이 가져오기
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: posts, error: postsError } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select(
      `
      *,
      users (
        nickname
      )
    `
    )
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (postsError) throw new Error(postsError.message);

  const postArray = Array.isArray(posts) ? posts : [];
  return {
    posts: postArray.map((post) => ({
      ...post,
      writer: {
        nickname: post.users.nickname
      }
    })),

    pagination: {
      currentPage: page,
      totalPages,
      totalCount
    }
  };
};

/** getPostImagesByPostIdByClient
 * 특정 게시글(post_id)에 연결된 이미지 URL 배열을 클라이언트에서 조회합니다.
 *
 * @param postId 게시글 ID
 * @returns 이미지 URL 문자열 배열 (없으면 빈 배열)
 */
export const getPostImagesByPostIdByClient = async (postId: TableGonggamPosts['id']): Promise<string[]> => {
  const { data, error } = await supabase.from(TABLE.GONGGAM_POST_IMAGE_PATH).select('image_url').eq('post_id', postId);

  if (error || !data) return [];

  return data.map((item) => item.image_url);
};

/** getPostMetaByPostIdByClient
 * 특정 post_id에 대한 좋아요 수와 댓글 수를 클라이언트에서 조회합니다.
 *
 * @param postId - 게시글 ID
 * @returns { likeCnt, commentCnt }
 */
export const getPostMetaByPostIdByClient = async (postId: TableGonggamPosts['id']): Promise<GonggamPostMeta> => {
  // RPC 함수 사용
  const { data, error } = await supabase.rpc('get_post_meta', { post_id: postId });

  if (error || !data || data.length === 0) {
    return { likeCnt: 0, commentCnt: 0 };
  }

  return {
    likeCnt: data[0].likes_count ?? 0,
    commentCnt: data[0].comments_count ?? 0
  };
};
