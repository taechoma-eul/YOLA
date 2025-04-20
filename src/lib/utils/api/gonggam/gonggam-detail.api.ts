import { TABLE } from '@/constants/supabase-tables-name';
import { getPostImagesByPostId, getWriterProfile } from '@/lib/utils/api/gonggam/gonggam-board.api';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { GonggamPostDetail } from '@/types/gonggam';
import type { TableGonggamPosts } from '@/types/supabase-const';

/** getGonggamPostDetail
 * postId를 기반으로 공감 게시글 내용을 조회합니다.
 *
 * @param postId - 게시글 고유 ID
 * @returns 게시글 본문, 이미지 배열, 작성자 닉네임 등 포함된 상세 정보
 */
export const getGonggamPostDetail = async (postId: TableGonggamPosts['id']): Promise<GonggamPostDetail> => {
  const supabase = await createClient();

  // 1. 게시글 기본 정보 조회
  const { data: post, error: postError } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*')
    .eq('id', postId)
    .single();

  if (postError || !post) throw new Error(postError.message);

  // 2. 작성자 닉네임 조회
  const profile = await getWriterProfile(post.user_id);

  // 3. 이미지 배열 조회
  const images = await getPostImagesByPostId(postId);

  return {
    ...post,
    profile,
    images
  };
};
