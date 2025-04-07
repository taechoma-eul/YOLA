'use client';
import LifeInputForm from '@/components/common/post-input-form';
import { usePathname } from 'next/navigation';

const PostMissionClear = ({ userId }: { userId: string }) => {
  const slug = usePathname().split('/').pop();
  return (
    <div>
      <LifeInputForm missionId={slug!} userId={userId} />
    </div>
  );
};

export default PostMissionClear;
