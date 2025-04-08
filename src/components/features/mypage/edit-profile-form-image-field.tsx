'use client';

import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Camera } from 'lucide-react';
import { processedImagePreview } from '@/lib/utils/processed-image';
import ProfileAvatar from '@/components/common/profile-avatar';
import { Button } from '@/components/ui/button';
import { FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { EditFormData } from '@/types/components/edit-profile-form';

const ProfileImageField = ({
  form,
  profileImage
}: {
  form: UseFormReturn<EditFormData>;
  profileImage: string | null;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // input 요소 참조
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL

  // 버튼 클릭 시 파일 선택 창 열기
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Form에 파일 설정
    form.setValue('profile_image_file', e.target.files);

    const url = await processedImagePreview(selectedFile);
    setPreviewUrl(url);
  };

  return (
    <FormField
      control={form.control}
      name="profile_image"
      render={() => (
        <div className="relative flex w-44 flex-col items-end justify-start">
          <ProfileAvatar src={previewUrl ? previewUrl : profileImage} />
          <FormControl>
            <Input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          </FormControl>

          <Button
            type="button"
            onClick={triggerFileInput}
            className="absolute left-[140px] top-[140px] flex h-10 w-10 items-center justify-center rounded-full bg-neutral-600 p-0"
          >
            <Camera />
          </Button>
        </div>
      )}
    />
  );
};

export default ProfileImageField;
