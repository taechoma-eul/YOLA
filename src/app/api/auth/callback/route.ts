import { createClient } from '@/lib/utils/supabase/supabase-server';
import { NextResponse } from 'next/server';

/**
 *
 * @param request 서버측 요청
 * @returns supabase가 반환한 리다이렉션 URL
 */
export const GET = async (request: Request) => {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code); // 코드로 세션 교환
  }

  return NextResponse.redirect('http://localhost:3000/'); // 홈으로 리다이렉트
};
