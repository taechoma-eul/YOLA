'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { MSG } from '@/constants/messages';
import { useUploadComment } from '@/lib/hooks/mutations/use-gonggam-mutation';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { toastAlert } from '@/lib/utils/toast';
import type { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useState } from 'react';

interface GonggamCommentFormProps {
  postId: number;
  initProfile: Tables<'users'>;
}

const GonggamCommentForm = ({ postId, initProfile }: GonggamCommentFormProps) => {
  const [newComment, setNewComment] = useState<string>('');
  const { profile, isProfilePending, profileFetchingError } = useUserProfile(initProfile);
  const { mutate: uploadComment, isPending: isUploading } = useUploadComment(postId);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    uploadComment(newComment, {
      onSuccess: () => {
        toastAlert(MSG.SUCCESS_UPLOAD_COMMENT);
        setNewComment('');
      },
      onError: (err) => {
        toastAlert(MSG.FAIL_TO_UPLOAD_COMMENT);
        throw Error(err.message);
      }
    });
  };

  if (profileFetchingError) throw Error(profileFetchingError.message);
  if (isProfilePending) return null;

  return (
    <div>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full">
          <Image
            src={profile!.profile_image || DEFAULT_AVATAR_URL}
            alt={`${profile?.nickname}`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <Input
          type="text"
          placeholder="댓글을 작성해보세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" disabled={isUploading}>
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default GonggamCommentForm;
