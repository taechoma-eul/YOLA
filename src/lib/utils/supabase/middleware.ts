import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { PATH } from '@/constants/page-path';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith(PATH.LOGIN) && !request.nextUrl.pathname.startsWith(PATH.SIGNUP)) {
    const url = request.nextUrl.clone();
    url.pathname = PATH.LOGIN;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
