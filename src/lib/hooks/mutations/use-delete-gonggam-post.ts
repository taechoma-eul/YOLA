import { useMutation } from '@tanstack/react-query';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { toastAlert } from '@/lib/utils/toast';
import type { GonggamPostDetail } from '@/types/gonggam';
interface useDeleteGonggamPostProps {
  onSuccessCallback?: () => void;
}

export const useDeleteGonggamPost = ({ onSuccessCallback }: useDeleteGonggamPostProps) => {
  return useMutation({
    mutationFn: async (post: GonggamPostDetail) => {
      const { id: postId, images: image_urls } = post;

      // 1. 댓글 삭제
      const { error: commentsDeleteError } = await supabase.from(TABLE.COMMENTS).delete().eq('post_id', postId);
      if (commentsDeleteError) throw new Error('댓글 삭제 실패');

      // 2. 좋아요 삭제
      const { error: likesDeleteError } = await supabase.from(TABLE.LIKES).delete().eq('post_id', postId);
      if (likesDeleteError) throw new Error('좋아요 삭제 실패');

      // 3. 이미지 삭제
      if (image_urls && image_urls.length > 0) {
        const { error: storageError } = await supabase.storage.from(TABLE.GONGGAM_POST_IMAGE_PATH).remove(image_urls);
        if (storageError) throw new Error('스토리지 이미지 삭제 실패');
      }

      // 4. 이미지 경로 삭제
      const { error: imageDeleteError } = await supabase
        .from(TABLE.GONGGAM_POST_IMAGE_PATH)
        .delete()
        .eq('post_id', postId);
      if (imageDeleteError) throw new Error('이미지 경로 삭제 실패');

      // 5. 게시글 삭제
      const { error: postDeleteError } = await supabase.from(TABLE.GONGGAM_POSTS).delete().eq('id', postId);
      if (postDeleteError) throw new Error('게시글 삭제 실패');
    },

    onSuccess: () => {
      toastAlert('게시글이 삭제되었습니다.');
      onSuccessCallback?.();
    },

    onError: (error) => {
      toastAlert(`오류 발생: ${error.message}`);
    }
  });
};
