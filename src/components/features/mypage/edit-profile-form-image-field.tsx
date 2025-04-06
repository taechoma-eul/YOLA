'use client';

import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ProfileAvatar from '@/components/common/profile-avatar';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Form에 파일 설정
    form.setValue('profile_image_file', e.target.files);

    // HEIC 파일인지 확인
    const isHeic =
      selectedFile.type === 'image/heic' ||
      selectedFile.name.toLowerCase().endsWith('.heic') ||
      selectedFile.name.toLowerCase().endsWith('.heif');

    if (isHeic) {
      // HEIC 파일을 JPEG로 변환
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('/api/convert-heic', {
        method: 'POST',
        body: formData
      })
        .then((response) => {
          if (!response.ok) throw new Error('HEIC 변환 실패');
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
        })
        .catch((error) => {
          console.error('HEIC 변환 오류:', error);
          setPreviewUrl(null); // 변환 실패 시 미리보기 없음
        });
    } else {
      // HEIC가 아닌 경우 원본 파일로 미리보기 생성
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="mx-auto mb-10 flex w-[150px] flex-col justify-center gap-5">
      <ProfileAvatar src={previewUrl ? previewUrl : profileImage} />
      <FormControl>
        <Input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      </FormControl>
      <Button type="button" onClick={triggerFileInput}>
        이미지 업로드
      </Button>
    </div>
  );
};

export default ProfileImageField;
