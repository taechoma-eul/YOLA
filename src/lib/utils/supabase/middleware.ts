import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { PATH } from '@/constants/page-path';
import { API } from '@/constants/api-path';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const publicPaths = [
    PATH.LOGIN,
    PATH.SIGNUP,
    PATH.HOME,
    PATH.CHECKLIST,
    PATH.MEAL_CHECKLIST,
    PATH.PLAY_CHECKLIST,
    PATH.CLEAN_CHECKLIST,
    PATH.TRAVEL_CHECKLIST,
    PATH.GOD_LIFE_CHECKLIST,
    PATH.GONGGAM,
    PATH.ERROR,
    API.GOOGLE_LOGIN,
    API.KAKAO_LOGIN,
    API.SOCIAL_LOGIN_CALL_BACK
  ];

  // 루트 경로는 정확한 매칭, 나머지는 startsWith
  const isPublicPath = publicPaths.some(
    (path) =>
      path === PATH.HOME
        ? request.nextUrl.pathname === path // 루트 경로는 정확한 매칭
        : request.nextUrl.pathname.startsWith(path) // 나머지는 startsWith
  );

  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = PATH.LOGIN;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
