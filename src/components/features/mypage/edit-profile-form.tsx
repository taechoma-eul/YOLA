'use client';

import { useState, useTransition } from 'react';
import { profileImageUpload } from '@/lib/utils/api/profile-image-upload.api';
import { useUpdateProfileMutate } from '@/lib/hooks/mutations/use-profile-update-mutate';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useProfileForm } from '@/lib/hooks/use-profile-form';
import { processedImage } from '@/lib/utils/processed-image';
import { toastAlert } from '@/lib/utils/toast';
import { CustomButton } from '@/components/ui/custom-button';
import { Form } from '@/components/ui/form';
import EmailField from '@/components/features/mypage/edit-profile-form-email-field';
import NicknameField from '@/components/features/mypage/edit-profile-form-nickname-field';
import ProfileImageField from '@/components/features/mypage/edit-profile-form-image-field';
import type { EditFormData, InitProfile } from '@/types/components/edit-profile-form';
import { FAIL, SUCCESS } from '@/constants/messages';

const EditProfileForm = ({ initProfile }: InitProfile) => {
  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { profile, isProfileError, profileFetchingError } = useUserProfile(initProfile);
  const updateProfile = useUpdateProfileMutate();
  const form = useProfileForm(initProfile.nickname);
  const { isValid } = form.formState;

  const handleProfileImageUpload = async () => {
    const file = form.getValues('profile_image_file')?.[0];

    if (!file) return null;

    const processedFile = await processedImage(file);
    const newImageUrl = await profileImageUpload(processedFile, initProfile);
    return newImageUrl;
  };

  const handleUpdateProfile = async (formData: EditFormData) => {
    startTransition(async () => {
      try {
        const imageUrl = await handleProfileImageUpload();
        const updatedData = {
          ...formData,
          profile_image: imageUrl || formData.profile_image // 업로드 없으면 기존 값 유지
        };
        updateProfile(updatedData);
        toastAlert(SUCCESS.UPDATE_PROFILE, 'success');
      } catch (error) {
        toastAlert(FAIL.UPDATE_PROFILE, 'destructive');
      }
    });
  };

  if (isProfileError) throw profileFetchingError;

  return (
    <Form {...form}>
      <form className="justify-items-end space-y-[48px]" onSubmit={form.handleSubmit(handleUpdateProfile)}>
        <div className="flex w-full items-start justify-start gap-10 rounded-xl bg-white p-8 outline outline-1 outline-offset-[-1px] outline-secondary-grey-400">
          <ProfileImageField form={form} profileImage={profile.profile_image} />
          <div className="flex w-[500px] flex-col items-start justify-center gap-4 self-stretch">
            <EmailField email={profile.email} />
            <NicknameField form={form} setDuplicateCheck={setDuplicateCheck} initNickname={profile.nickname} />
          </div>
        </div>
        <CustomButton
          type="submit"
          disabled={!isValid || !duplicateCheck || isPending}
          variant="default"
          size="gonggam-write"
        >
          {isPending ? '저장 중...' : '저장하기'}
        </CustomButton>
      </form>
    </Form>
  );
};

export default EditProfileForm;
