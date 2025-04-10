import type { Tables } from '@/types/supabase';
import { supabase } from '../supabase/supabase-client';
import { TABLE } from '@/constants/supabase-tables-name';
import { unstable_cache } from 'next/cache';

// 미션리스트 전체 가져옴
export const _getMissions = async (): Promise<Tables<'mission_list'>[]> => {
  const { data, error } = await supabase.from(TABLE.MISSION_LIST).select('*');

  if (error || !data) {
    throw new Error('미션 가져오기 실패');
  }
  return data;
};

export const getMissions = unstable_cache(_getMissions, ['mission-list-cache-key'], {
  revalidate: false
});
