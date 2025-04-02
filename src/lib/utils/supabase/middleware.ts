import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/utils/supabase/supabase-server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
