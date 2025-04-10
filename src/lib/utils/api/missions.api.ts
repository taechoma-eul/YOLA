import { Tables } from '@/types/supabase';

export const getMissions = async (): Promise<Tables<'mission_list'>[]> => {
  try {
    const res = await fetch('/api/missions', {
      // @ts-expect-error: Next.js extended fetch option
      next: { cache: 'force-cache' }
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || `서버 오류 발생(status: ${res.status})`;
      throw new Error(message);
    }
    const data: Tables<'mission_list'>[] = await res.json();
    return data;
  } catch (err) {
    console.error('getMissions 호출 실패', err);
    throw new Error(err instanceof Error ? err.message : '알 수 없는 에러가 발생했어요');
  }
};
