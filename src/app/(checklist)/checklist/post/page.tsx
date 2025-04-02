'use client';

import { useSearchParams } from 'next/navigation';

const MissionPostPage = () => {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get('type') || '';
  const selectedMission = searchParams.get('content') || '';

  return <div>{`${selectedType + selectedMission} 미션인증 페이지`}</div>;
};

export default MissionPostPage;
