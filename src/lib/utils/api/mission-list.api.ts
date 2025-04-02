'use server';

import { createClient } from '@/lib/utils/supabase/supabase-server';

// 전체 미션 데이터 중 랜덤으로 하나씩 반환합니다
export const getRandomMissionData = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('mission_list').select('*');
  if (!data) {
    throw new Error('요청한 데이터가 없습니다.');
  }
  const MAX = data.length;
  const MIN = 0;
  const randomIndexNum = Math.floor(Math.random() * (MAX - MIN));

  if (error) {
    throw new Error('미션을 가져오는데 실패했어요.');
  }
  return data[randomIndexNum];
};
