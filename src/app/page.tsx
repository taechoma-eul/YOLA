import { getUserMetadata } from '@/lib/utils/api/auth-action';
import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import ChecklistClient from '@/components/features/checklist/checklist-client';

const HomePage = async () => {
  const uniqueTypes = await getUniqueMissionType();
  const user = await getUserMetadata();
  console.log('user', user);

  return (
    <>
      <ChecklistClient uniqueTypes={uniqueTypes} />
    </>
  );
}
