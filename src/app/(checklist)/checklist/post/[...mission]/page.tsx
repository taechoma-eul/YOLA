import PostMissionClear from '@/components/features/checklist/post-mission-clear';
import { getUserSessionState } from '@/lib/utils/api/auth-action';

const MissionPostPage = async () => {
  const { userId } = await getUserSessionState();

  return <PostMissionClear userId={userId!} />;
};

export default MissionPostPage;
