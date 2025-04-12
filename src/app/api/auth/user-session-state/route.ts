import { NextRequest, NextResponse } from 'next/server';
import { getUserSessionState } from '@/lib/utils/api/auth.api';
import { FAIL } from '@/constants/messages';

/**
 * 클라이언트에서 getUserSessionState() 함수를 이용해서 사용자 아이디와 로그인 상태를 받아오기 위한 라우트 핸들러입니다.
 * @param { NextRequest } request
 * @returns 사용자 아이디(비로그인 상태일 땐 Null) / 로그인 상태(boolean)
 */
export const GET = async (request: NextRequest) => {
  try {
    const data = await getUserSessionState();
    return NextResponse.json({ data });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || FAIL.SESSION }, { status: 500 });
  }
};
