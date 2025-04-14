import type { Tables } from '@/types/supabase';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { TABLE } from '@/constants/supabase-tables-name';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATH } from '@/constants/page-path';
import { SupabaseClient } from '@supabase/supabase-js';

const GET_MISSIONS_DATA_KEY = 'mission-list-cache-key';

// 미션리스트 전체 가져옴
const _getMissionsData = async (supabase: SupabaseClient): Promise<Tables<'mission_list'>[]> => {
  const { data, error } = await supabase.from(TABLE.MISSION_LIST).select('*');
  if (error || !data) {
    redirect(PATH.ERROR);
  }
  return data;
};

// next/cache 캐시 적용
export const getMissionsData = async () => {
  const supabase = await createClient();

  const cachedFn = unstable_cache(_getMissionsData, [GET_MISSIONS_DATA_KEY], { revalidate: false });

  return cachedFn(supabase);
};
