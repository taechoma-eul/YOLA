import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { TABLE } from '@/constants/supabase-tables-name';
import type { LifePostWithImageUrls } from '@/types/life-post';

const LIFE_POSTS_TABLE = TABLE.LIFE_POSTS;

export const useDeleteLifePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: LifePostWithImageUrls) => {
      const { id: postId, user_id, mission_id, image_urls } = post;

      // Step 1. 스토리지에서 이미지 삭제
      if (image_urls && image_urls.length > 0) {
        const { error: storageError } = await supabase.storage.from('life_post_image_path').remove(image_urls);
        if (storageError) throw new Error('스토리지 이미지 삭제 실패');
      }

      // Step 2. 이미지 경로 supabase 삭제
      const { error: imageDeleteError } = await supabase
        .from('life_post_image_path')
        .delete()
        .eq('life_post_id', postId);
      if (imageDeleteError) throw new Error('이미지 경로 supabase 삭제 실패');

      // Step 3. 유저 미션 삭제
      if (mission_id) {
        const { error: missionDeleteError } = await supabase
          .from('user_mission')
          .delete()
          .match({ user_id, completed_id: mission_id });

        if (missionDeleteError) throw new Error('유저 미션 삭제 실패');
      }

      // Step 4. 게시글 삭제
      const { error: postDeleteError } = await supabase.from(LIFE_POSTS_TABLE).delete().eq('id', postId);
      if (postDeleteError) throw new Error('게시글 삭제 실패');
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifePosts'] });
    }
  });
};
