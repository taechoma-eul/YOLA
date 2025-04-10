'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { parseTags } from '@/lib/utils/parse-tags';

interface UpdateLifePostPayload {
  id: number;
  title: string;
  content: string;
  rawTags: string;
  imageUrls: string[];
  missionId: string | null;
  date: string;
}

export const useUpdateLifePost = () => {
  return useMutation({
    mutationFn: async ({ id, title, content, rawTags, imageUrls, missionId, date }: UpdateLifePostPayload) => {
      // 1. life_posts 테이블 업데이트
      const { error: updateError } = await supabase
        .from('life_posts')
        .update({
          title,
          content,
          tags: parseTags(rawTags),
          mission_id: missionId ? +missionId : null,
          date
        })
        .eq('id', id);

      if (updateError) {
        throw new Error('게시글 업데이트 실패: ' + updateError.message);
      }

      // 2. 기존 이미지 경로 삭제
      const { error: deleteError } = await supabase.from('life_post_image_path').delete().eq('life_post_id', id);

      if (deleteError) {
        throw new Error('기존 이미지 삭제 실패: ' + deleteError.message);
      }

      // 3. 새로운 이미지 경로 삽입
      if (imageUrls.length > 0) {
        const insertData = imageUrls.map((url) => ({
          life_post_id: id,
          image_url: url
        }));

        const { error: insertError } = await supabase.from('life_post_image_path').insert(insertData);

        if (insertError) {
          throw new Error('새 이미지 등록 실패: ' + insertError.message);
        }
      }

      return { success: true };
    }
  });
};
