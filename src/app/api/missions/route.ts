import { createClient } from '@/lib/utils/supabase/supabase-server';
import { NextResponse } from 'next/server';
import { TABLE } from '@/constants/supabase-tables-name';

// 모든 미션 리스트를 다 가져옵니다
export const GET = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from(TABLE.MISSION_LIST).select('*');

  if (error || !data) {
    return NextResponse.json({ message: '미션 가져오기 실패' }, { status: 500 });
  }

  return NextResponse.json(data, {
    status: 200
  });
};
