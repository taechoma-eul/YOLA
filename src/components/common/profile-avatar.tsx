import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DefaultImage from './default-image.svg';

const ProfileAvatar = ({ src }: { src: string | null }) => {
  return (
    <Avatar className="h-[172px] w-[172px] rounded-2xl border-2 border-[#FEF4E7]">
      <AvatarImage src={src ? src : ''} />
      <AvatarFallback className="rounded-2xl">
        <DefaultImage />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
