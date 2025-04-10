// src/lib/hooks/mutations/use-update-life-post.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { parseTags } from '@/lib/utils/parse-tags';

interface UpdateLifePostPayload {
  id: number;
  title: string;
  content: string;
  rawTags: string; // 쉼표로 구분된 태그 문자열
  imageUrls: string[]; // Supabase public URL들
  missionId: string | null;
  date: string;
}

export const useUpdateLifePost = () => {
  return useMutation({
    mutationFn: async ({ id, title, content, rawTags, imageUrls, missionId, date }: UpdateLifePostPayload) => {
      const { error } = await supabase
        .from('life_posts')
        .update({
          title,
          content,
          tags: parseTags(rawTags), // ["운동", "헬스"]
          image_urls: imageUrls,
          mission_id: missionId ? +missionId : null,
          date
        })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    }
  });
};
