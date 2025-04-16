import { useQuery } from '@tanstack/react-query';
import type { LifePostWithImageUrls } from '@/types/life-post';
import { QUERY_KEY } from '@/constants/query-keys';
import { getLifePostByMissionId } from '@/lib/utils/api/life-by-mission.api';

export const useGetLifePostByMissionId = (missionId: number | null) => {
  return useQuery<LifePostWithImageUrls>({
    queryKey: QUERY_KEY.LIFE_POSTS(String(missionId)),
    queryFn: () => getLifePostByMissionId(missionId!),
    enabled: missionId !== null
  });
};
