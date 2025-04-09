'use client';

import { useState } from 'react';
import { profileImageUpload } from '@/lib/utils/api/profile-image-upload.api';
import { useUpdateProfileMutate } from '@/lib/hooks/mutations/use-profile-update-mutate';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useProfileForm } from '@/lib/hooks/use-profile-form';
import { processedImage } from '@/lib/utils/processed-image';
import { toastAlert } from '@/lib/utils/toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import EmailField from '@/components/features/mypage/edit-profile-form-email-field';
import NicknameField from '@/components/features/mypage/edit-profile-form-nickname-field';
import ProfileImageField from '@/components/features/mypage/edit-profile-form-image-field';
import type { EditFormData, InitProfile } from '@/types/components/edit-profile-form';
import type { Tables } from '@/types/supabase';
import { ERROR_MESSAGE } from '@/constants/auth-form';

const EditProfileForm = ({ initProfile }: InitProfile) => {
  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);

  const { profile, isProfileError, profileFetchingError } = useUserProfile();
  const updateProfile = useUpdateProfileMutate();
  const form = useProfileForm(initProfile.nickname);
  const { isValid } = form.formState;

  const displayProfile: Tables<'users'> = profile ? profile : initProfile;

  const handleProfileImageUpload = async () => {
    const file = form.getValues('profile_image_file')?.[0];

    if (!file) return null;

    const processedFile = await processedImage(file);
    const newImageUrl = await profileImageUpload(processedFile, initProfile);
    return newImageUrl;
  };

  const handleUpdateProfile = async (formData: EditFormData) => {
    if (!duplicateCheck) {
      toastAlert(ERROR_MESSAGE.NICKNAME_CHECK, 'destructive');
      return;
    }

    if (!isValid) {
      toastAlert(ERROR_MESSAGE.FIELD_CHECK, 'destructive');
      return;
    }

    try {
      const imageUrl = await handleProfileImageUpload();
      const updatedData = {
        ...formData,
        profile_image: imageUrl || formData.profile_image // 업로드 없으면 기존 값 유지
      };
      updateProfile(updatedData);
      toastAlert('프로필 변경이 완료되었습니다.', 'success');
    } catch (error) {
      toastAlert('사용자 정보 변경에 실패했습니다.', 'destructive');
    }
  };

  if (isProfileError) throw profileFetchingError;

  return (
    <Form {...form}>
      <form className="justify-items-end space-y-[48px]" onSubmit={form.handleSubmit(handleUpdateProfile)}>
        <div className="flex w-full items-start justify-start gap-10 rounded-xl bg-white p-8 outline outline-1 outline-offset-[-1px] outline-neutral-300">
          <ProfileImageField form={form} profileImage={displayProfile.profile_image} />
          <div className="flex w-[500px] flex-col items-start justify-center gap-4 self-stretch">
            <EmailField email={displayProfile.email} />
            <NicknameField form={form} setDuplicateCheck={setDuplicateCheck} initNickname={displayProfile.nickname} />
          </div>
        </div>
        <Button type="submit">수정하기</Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
