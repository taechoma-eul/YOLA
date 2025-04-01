import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import ChecklistClient from '../components/features/checklist/checklist-client';

export default async function Home() {
  const uniqueTypes = await getUniqueMissionType();
  return (
    <>
      <ChecklistClient uniqueTypes={uniqueTypes} />
    </>
  );
}
