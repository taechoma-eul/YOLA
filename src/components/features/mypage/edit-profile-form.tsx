'use client';

import { useState, useTransition } from 'react';
import EmailField from '@/components/features/mypage/edit-profile-form-email-field';
import ProfileImageField from '@/components/features/mypage/edit-profile-form-image-field';
import NicknameField from '@/components/features/mypage/edit-profile-form-nickname-field';
import { CustomButton } from '@/components/ui/custom-button';
import { Form } from '@/components/ui/form';
import { FAIL, SUCCESS } from '@/constants/messages';
import { useUpdateProfileMutate } from '@/lib/hooks/mutations/use-profile-update-mutate';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useProfileForm } from '@/lib/hooks/use-profile-form';
import { toastAlert } from '@/lib/utils/toast';
import type { EditFormData, InitProfile } from '@/types/auth-form';
import { profileImageUploader } from '@/lib/utils/api/mypage/profile-image-upload.api';

const EditProfileForm = ({ initProfile }: InitProfile) => {
  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { profile, isProfileError, profileFetchingError } = useUserProfile(initProfile);
  const updateProfile = useUpdateProfileMutate();

  const form = useProfileForm(initProfile.nickname);
  const { isValid } = form.formState;

  const handleUpdateProfile = async (formData: EditFormData) => {
    startTransition(async () => {
      try {
        const imageUrl = await profileImageUploader({ form, profile: initProfile });
        const updatedData = {
          ...formData,
          profile_image: imageUrl || formData.profile_image // 이미지 업로드 없거나 실패시에는 기존 값 유지
        };
        updateProfile(updatedData);
        toastAlert(SUCCESS.UPDATE_PROFILE, 'success');
      } catch {
        toastAlert(FAIL.UPDATE_PROFILE, 'destructive');
      }
    });
  };

  if (isProfileError) throw profileFetchingError;

  return (
    <Form {...form}>
      <form className="w-[941px] justify-items-end space-y-[38px]" onSubmit={form.handleSubmit(handleUpdateProfile)}>
        <div className="flex h-[236px] w-full items-start justify-start gap-10 rounded-xl bg-white p-8 outline outline-1 outline-offset-[-1px] outline-secondary-grey-400">
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
