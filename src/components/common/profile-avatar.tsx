import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileAvatar = ({ src }: { src: string | null }) => {
  return (
    <Avatar className="h-[150px] w-[150px] border-2 border-gray-500">
      <AvatarImage src={src ? src : ''} />
      <AvatarFallback className="bg-gray-200">
        <User color="#ffffff" className="h-[100px] w-[100px]" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
