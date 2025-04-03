// /app/api/life-posts/route.ts (서버 컴포넌트 전용)
import { getLifePostsByMonth } from '@/lib/utils/api/my-life.api';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');

  if (!month) return NextResponse.json({ error: 'month is required' }, { status: 400 });

  try {
    const posts = await getLifePostsByMonth(month);
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
