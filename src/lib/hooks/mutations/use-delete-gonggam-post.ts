import { useMutation } from '@tanstack/react-query';
import { FAIL, SUCCESS } from '@/constants/messages';
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

      // 1. 스토리지 이미지 삭제
      if (image_urls && image_urls.length > 0) {
        const { error: storageError } = await supabase.storage.from(TABLE.GONGGAM_POST_IMAGE_PATH).remove(image_urls);
        if (storageError) throw new Error(FAIL.STORAGE_DELETE_ERROR);
      }

      // 2. 게시글 삭제 (CASCADE로 연관 데이터 자동 삭제)
      const { error: postDeleteError } = await supabase.from(TABLE.GONGGAM_POSTS).delete().eq('id', postId);
      if (postDeleteError) throw new Error(FAIL.GONGGAM_POST_DELETE_ERROR);
    },

    onSuccess: () => {
      toastAlert(SUCCESS.DELETE_GONGGAM_POST, 'success');
      onSuccessCallback?.();
    },

    onError: (error) => {
      console.error('게시글 삭제 오류', error.message);
      toastAlert(FAIL.GONGGAM_POST_DELETE_ERROR, 'destructive');
    }
  });
};
