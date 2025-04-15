'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { MSG } from '@/constants/messages';
import { useUploadComment } from '@/lib/hooks/mutations/use-gonggam-mutation';
import { toastAlert } from '@/lib/utils/toast';
import Image from 'next/image';
import { useState } from 'react';

interface GonggamCommentFormProps {
  postId: number;
  isLogin: boolean;
  profileImage?: string;
}

const GonggamCommentForm = ({ postId, isLogin, profileImage = DEFAULT_AVATAR_URL }: GonggamCommentFormProps) => {
  const [newComment, setNewComment] = useState<string>('');
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

  return (
    <div>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full">
          <Image src={profileImage} alt="profile" fill sizes="40px" className="object-cover" />
        </div>
        <Input
          type="text"
          placeholder={isLogin ? '댓글을 작성해보세요.' : '댓글을 작성하려면 로그인 해주세요.'}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!isLogin}
        />
        <Button type="submit" disabled={isUploading || !isLogin}>
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default GonggamCommentForm;
