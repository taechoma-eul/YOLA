import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import ChecklistClient from './checklist-client';

const Checklist = async () => {
  const uniqueTypes = await getUniqueMissionType();

  return <ChecklistClient uniqueTypes={uniqueTypes} />;
};

export default Checklist;
