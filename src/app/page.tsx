import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import ChecklistClient from '@/components/features/checklist/checklist-client';

const HomePage = async () => {
  const uniqueTypes = await getUniqueMissionType();

  return (
    <>
      <ChecklistClient uniqueTypes={uniqueTypes} />
    </>
  );
};

export default HomePage;
