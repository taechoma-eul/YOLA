import PostInputForm from '@/components/common/post-input-form';

const LifePostPage = ({ searchParams }: { searchParams: { mission_id?: string } }) => {
  const missionId = searchParams?.mission_id ?? null;

  return <PostInputForm userId="" missionId={missionId} />;
};

export default LifePostPage;
