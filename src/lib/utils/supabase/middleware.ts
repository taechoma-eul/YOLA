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
    `${PATH.GONGGAM}/:category/:postId`,
    PATH.ERROR,
    API.GOOGLE_LOGIN,
    API.KAKAO_LOGIN,
    API.SOCIAL_LOGIN_CALL_BACK,
    API.DUPLICATE
  ];

  // 루트 경로는 정확한 매칭, /gonggam/[category]/[postId]는 정규식으로 체크, 나머지는 startsWith
  const isPublicPath = publicPaths.some((path) => {
    if (path === PATH.HOME) {
      return request.nextUrl.pathname === path; // 루트 경로는 정확한 매칭
    }
    if (path === `${PATH.GONGGAM}/:category/:postId`) {
      // /gonggam/[category]/[postId] 패턴 체크
      return request.nextUrl.pathname.match(new RegExp(`^${PATH.GONGGAM}/[^/]+/[^/]+$`));
    }
    return request.nextUrl.pathname.startsWith(path); // 나머지는 startsWith
  });

  // 로그인하지 않은 사용자가 비공개 경로에 접근하려는 경우
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = PATH.LOGIN;
    return NextResponse.redirect(url);
  }

  // 로그인한 사용자가 login 또는 signup 페이지에 접근하려는 경우
  if (user && (request.nextUrl.pathname === PATH.LOGIN || request.nextUrl.pathname === PATH.SIGNUP)) {
    const url = request.nextUrl.clone();
    url.pathname = PATH.HOME;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
