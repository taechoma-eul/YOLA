import { supabase } from '@/lib/utils/supabase/supabase-client';

/** getPostMetaClient
 * 클라이언트 컴포넌트에서 사용할 게시글 메타데이터 조회 함수
 * - Supabase 클라이언트 사용
 * - `gonggam_posts_with_counts` 뷰에서 좋아요 수, 댓글 수를 가져옴
 *
 * @param postId 게시글 ID
 * @returns { likeCnt, commentCnt } 좋아요 수와 댓글 수
 */
export const getPostMetaClient = async (postId: number) => {
  const { data, error } = await supabase
    .from('gonggam_posts_with_counts')
    .select('like_count, comment_count')
    .eq('id', postId)
    .single();

  if (error) throw new Error(error.message);

  return {
    likeCnt: data.like_count ?? 0,
    commentCnt: data.comment_count ?? 0
  };
};
