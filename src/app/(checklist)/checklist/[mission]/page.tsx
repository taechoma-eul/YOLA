import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import { notFound } from 'next/navigation';

const Checklist = async ({ params }: { params: { mission: string } }) => {
  const decodedMission = decodeURIComponent(params.mission); // 한글 경로 디코딩
  const uniqueTypes = await getUniqueMissionType();

  if (!uniqueTypes.includes(decodedMission)) {
    notFound(); // 유효하지 않은 체크리스트 접근 시 404 redirect
  }

  return <div>mission-list: {decodedMission}</div>;
};

export default Checklist;
