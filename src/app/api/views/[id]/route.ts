import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { NextResponse } from 'next/server';

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = await createClient();

  const { id } = params;

  // 조회수 증가
  await supabase.rpc('increment_view_count', { post_id: parseInt(id) });

  return NextResponse.json({ message: 'Success' }, { status: 200 });
};

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = await createClient();

  const { id } = params;

  // 특정 게시물의 조회수 조회
  const { data } = await supabase.from(TABLE.GONGGAM_POSTS).select('view_count').eq('id', parseInt(id));

  if (!data) return NextResponse.json({ message: '데이터 없음' }, { status: 500 });

  return NextResponse.json({ total: data[0]?.view_count || 0 }, { status: 200 });
};
