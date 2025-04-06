'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileImageUpload } from '@/lib/utils/api/profile-image-upload.api';
import { processedImage } from '@/lib/utils/processed-image';
import { editProfileSchema } from '@/lib/utils/validation/auth-validate';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useUpdateProfileMutate } from '@/lib/hooks/mutations/use-profile-update-mutate';
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

    const processedFile = await processedImage(file);
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
