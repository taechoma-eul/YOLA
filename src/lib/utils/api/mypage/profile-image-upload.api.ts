import { deleteExistingImage } from '@/lib/utils/extract-file-form-url';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import type { TableUsers } from '@/types/supabase-const';

export const profileImageUpload = async (file: File, profile: TableUsers | undefined): Promise<string | undefined> => {
  const existingImageUrl = profile?.profile_image;
  if (existingImageUrl) {
    await deleteExistingImage(existingImageUrl);
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${profile?.id}_profile_${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage
    .from('profile-images') // 버킷 이름
    .upload(fileName, file, {
      contentType: file.type // 파일 MIME 타입
    });

  if (error) {
    console.error('업로드 오류:', error);
    return;
  }

  const imageUrl = supabase.storage.from('profile-images').getPublicUrl(fileName).data.publicUrl;

  return imageUrl;
};
