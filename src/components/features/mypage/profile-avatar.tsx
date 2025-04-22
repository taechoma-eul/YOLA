import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { clsx } from 'clsx';
import DEFAULT_AVATAR_IMAGE from '@images/images/default-avatar.svg';

interface ProfileAvatarProps {
  src: string | null;
  size: 24 | 40 | 48 | 172;
  className?: string;
}

const ProfileAvatar = ({ src, size, className }: ProfileAvatarProps) => {
  const dimensionClass = clsx({
    'h-[24px] w-[24px]': size === 24,
    'h-[40px] w-[40px]': size === 40,
    'h-[48px] w-[48px]': size === 48,
    'h-[172px] w-[172px]': size === 172
  });

  return (
    <Avatar
      className={clsx(
        dimensionClass,
        className // rounded-full or rounded-2xl 등
      )}
    >
      <AvatarImage src={src ?? ''} />
      <AvatarFallback className={className}>
        <Image src={DEFAULT_AVATAR_IMAGE} alt="디폴트 프로필 이미지" width={size} height={size} />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
