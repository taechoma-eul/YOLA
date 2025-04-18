import { NextRequest, NextResponse } from 'next/server';
import { getDuplicateCheckData } from '@/lib/utils/api/auth/auth.api';

/**
 * 클라이언트에서 supabase ssr 데이터를 조회하기 위한 라우트 핸들러입니다.
 * @param { NextRequest } request
 * @returns 중복 데이터 존재할 시 { 필드이름: 값 } 형식 반환 / 없을 시 null 반환
 */
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const field = searchParams.get('field');
    const value = searchParams.get('value');

    if (!field || !value) {
      return NextResponse.json({ error: '필드와 값이 필요합니다.' }, { status: 400 });
    }

    const data = await getDuplicateCheckData(field, value);

    return NextResponse.json({ data });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || '중복 체크에 실패했습니다.' }, { status: 500 });
  }
};
