import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import Image from 'next/image';

const ProfileAvatar = ({ src }: { src: string | null }) => {
  return (
    <Avatar className="mb-[20px] h-[172px] w-[172px] rounded-2xl border-2 border-[#EFF1F3]">
      <AvatarImage src={src ? src : ''} />
      <AvatarFallback className="rounded-2xl">
        <Image src={DEFAULT_AVATAR_URL} alt="디폴트 프로필 이미지" width={172} height={172} />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
