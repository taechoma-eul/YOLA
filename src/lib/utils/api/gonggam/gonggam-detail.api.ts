import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { GonggamPostDetail } from '@/types/gonggam';
import type { TableGonggamPosts } from '@/types/supabase-const';

/** getGonggamPostDetailByClient
 * postId를 기반으로 공감 게시글 내용을 조회합니다.
 *
 * @param postId - 게시글 고유 ID
 * @returns 게시글 본문, 이미지 배열, 작성자 정보 등 포함된 상세 정보
 */
export const getGonggamPostDetailByClient = async (postId: TableGonggamPosts['id']): Promise<GonggamPostDetail> => {
  // 1. 게시글 + 작성자 조인 조회

  const { data: post, error: postError } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select(
      `
      *,
      users (
        nickname,
        profile_image
      )
    `
    )
    .eq('id', postId)
    .single();

  if (postError || !post) throw new Error(postError.message);

  // 2. 이미지 배열 직접 조회
  const { data: imageData, error: imageError } = await supabase
    .from(TABLE.GONGGAM_POST_IMAGE_PATH)
    .select('image_url')
    .eq('post_id', postId);

  if (imageError || !imageData) throw new Error(imageError.message);
  const images = !imageError && imageData ? imageData.map((item) => item.image_url) : [];

  return {
    ...post,
    images
  };
};
