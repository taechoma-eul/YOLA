'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useUpdateProfileMutate } from '@/lib/hooks/mutations/use-profile-update-mutate';
import { editProfileSchema } from '@/lib/utils/validation/auth-validate';
import { profileImageUpload } from '@/lib/utils/api/profile-image-upload.api';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import ProfileImageField from '@/components/features/mypage/edit-profile-form-image-field';
import ProfileEmailField from '@/components/features/mypage/edit-profile-form-email-field';
import NicknameField from '@/components/features/mypage/edit-profile-form-nickname-field';
import type { EditFormData, InitProfile } from '@/types/components/edit-profile-form';

const EditProfileForm = ({ initProfile }: InitProfile) => {
  const { profile, isProfilePending, isProfileError } = useUserProfile();
  const updateProfile = useUpdateProfileMutate();

  const displayProfile = !profile || isProfileError || isProfilePending ? initProfile : profile;

  const form = useForm<EditFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: initProfile.nickname as string,
      profile_image_file: null,
      profile_image: ''
    }
  });

  const handleProfileImageUpload = async () => {
    const file = form.getValues('profile_image_file')?.[0];

    if (!file) return null;

    // HEIC 파일인지 확인 (확장자 또는 MIME 타입으로 판단)
    const isHeic =
      file.type === 'image/heic' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif');

    let processedFile = file;

    if (isHeic) {
      // HEIC 파일을 JPEG로 변환
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/convert-heic', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('HEIC 변환 실패');

        // 변환된 JPEG 파일을 Blob으로 받아 새로운 File 객체 생성
        const blob = await response.blob();
        processedFile = new File([blob], `${file.name.split('.')[0]}.jpg`, {
          type: 'image/jpeg'
        });
      } catch (error) {
        console.error('HEIC 변환 오류:', error);
        return null; // 변환 실패 시 null 반환
      }
    }

    // 변환된 파일(또는 원본 파일)을 기존 업로드 함수에 전달
    const newImageUrl = await profileImageUpload(processedFile, profile);
    return newImageUrl;
  };

  const handleUpdateProfile = async (formData: EditFormData) => {
    try {
      const imageUrl = await handleProfileImageUpload();
      const updatedData = {
        ...formData,
        profile_image: imageUrl || formData.profile_image // 업로드 없으면 기존 값 유지
      };
      updateProfile(updatedData);
    } catch (error) {
      console.log('사용자 정보 변경에 실패했습니다.');
    }
  };

  return (
    <Form {...form}>
      <form className="w-[500px] space-y-5 border-2 p-5" onSubmit={form.handleSubmit(handleUpdateProfile)}>
        <FormField
          control={form.control}
          name="profile_image"
          render={() => <ProfileImageField form={form} profileImage={displayProfile.profile_image} />}
        />
        <ProfileEmailField email={displayProfile.email} />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <NicknameField field={field} nickname={displayProfile.nickname ? displayProfile.nickname : ''} />
          )}
        />
        <div className="h-[30px]" />
        <Button type="submit" className="w-full">
          저장하기
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
