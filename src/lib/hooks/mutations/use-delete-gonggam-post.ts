import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { TABLE } from '@/constants/supabase-tables-name';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { toastAlert } from '@/lib/utils/toast';
import type { TableGonggamPosts } from '@/types/supabase-const';

export interface GonggamPostWithImageUrls extends TableGonggamPosts {
  image_urls: string[];
}

export const useDeleteGonggamPost = () => {
  return useMutation({
    mutationFn: async (post: GonggamPostWithImageUrls) => {
      const { id: postId, user_id, image_urls } = post;

      // Step 1. 스토리지에서 이미지 삭제
      if (image_urls && image_urls.length > 0) {
        const { error: storageError } = await supabase.storage.from(TABLE.GONGGAM_POST_IMAGE_PATH).remove(image_urls);
        if (storageError) throw new Error('스토리지 이미지 삭제 실패');
      }

      // Step 2. 이미지 경로 supabase 삭제
      const { error: imageDeleteError } = await supabase
        .from(TABLE.GONGGAM_POST_IMAGE_PATH)
        .delete()
        .eq('post_id', postId);
      if (imageDeleteError) throw new Error('이미지 경로 supabase 삭제 실패');

      // Step 3. comments 삭제
      const { error: commentsDeleteError } = await supabase.from(TABLE.COMMENTS).delete().match({ user_id, postId });
      if (commentsDeleteError) throw new Error('댓글 삭제 실패');

      // Step 4. likes 삭제
      const { error: likesDeleteError } = await supabase.from(TABLE.LIKES).delete().match({ user_id, postId });
      if (likesDeleteError) throw new Error('좋아요 삭제 실패');

      // Step 5. 게시글 삭제
      const { error: postDeleteError } = await supabase.from(TABLE.GONGGAM_POSTS).delete().eq('id', postId);
      if (postDeleteError) throw new Error('게시글 삭제 실패');
    },

    onSuccess: () => {
      const pathname = usePathname();
      const router = useRouter();

      toastAlert('게시글이 삭제되었습니다.');
      router.push(pathname.split('/').slice(0, -1).join('/'));
    }
  });
};
