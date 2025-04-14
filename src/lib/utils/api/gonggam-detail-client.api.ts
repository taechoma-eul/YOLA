import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { CommentWithUser, UploadGonggamCommentParams } from '@/types/gonggam';

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

/** getCommentsByPostId
 * 특정 게시글(postId)에 대한 댓글 목록을 조회합니다.
 * 댓글 작성자의 프로필 정보(nickname, profile_image)도 함께 가져옵니다.
 *
 * @param postId - 댓글을 조회할 게시글 ID
 * @returns 댓글 및 작성자 정보 배열 (CommentWithUser[])
 */
export const getCommentsByPostId = async (postId: number): Promise<CommentWithUser[]> => {
  const { data, error } = await supabase
    .from('comments')
    .select(
      `
      id,
      created_at,
      comment,
      writer:users (
        nickname,
        profile_image
      )
    `
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data.map((comment) => ({
    ...comment,
    writer: {
      ...comment.writer,
      profileImage: comment.writer.profile_image
    }
  }));
};

/** uploadGonggamComment
 * 새로운 댓글을 업로드합니다. (INSERT)
 *
 * @param postId - 댓글을 작성할 게시글 ID
 * @param comment - 댓글 본문 내용
 */
export const uploadGonggamComment = async ({ postId, comment }: UploadGonggamCommentParams) => {
  const { error } = await supabase.from('comments').insert([{ post_id: postId, comment }]);
  if (error) throw new Error(error.message);
};

/** getUserLikedPost
 * 현재 사용자가 해당 게시글에 좋아요했는지 여부
 */
export const getUserLikedStatus = async ({ postId, userId }: { postId: number; userId: string }) => {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return !!data;
};

/** 좋아요 등록 (Insert) */
export const likePost = async ({ postId }: { postId: number }) => {
  const { error } = await supabase.from('likes').insert([{ post_id: postId }]);
  if (error) throw new Error(error.message);
};

/** 좋아요 취소 (Delete) */
export const dislikePost = async ({ postId, userId }: { postId: number; userId: string }) => {
  const { error } = await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', userId);
  if (error) throw new Error(error.message);
};
