import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { clsx } from 'clsx';

interface ProfileAvatarProps {
  src: string | null;
  mode: 'mobile' | 'pc';
}

const ProfileAvatar = ({ src, mode }: ProfileAvatarProps) => {
  return (
    <Avatar
      className={clsx('mb-[20px] rounded-2xl border-2 border-[#EFF1F3]', {
        'min-h-[48px] min-w-[48px]': mode === 'mobile',
        'h-[172px] w-[172px]': mode === 'pc'
      })}
    >
      <AvatarImage src={src ? src : ''} />
      <AvatarFallback className="rounded-2xl">
        <Image
          src={DEFAULT_AVATAR_URL}
          alt="디폴트 프로필 이미지"
          width={mode === 'mobile' ? 48 : 172}
          height={mode === 'mobile' ? 48 : 172}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
