// src/app/(life)/life/page.tsx
import LifePageClient from '@/components/features/life/life-page-client';
import { PATH } from '@/constants/page-path';
import { getUserProfile } from '@/lib/utils/api/auth-action';
import { redirect } from 'next/navigation';

const LifePage = async () => {
  const profile = await getUserProfile();

  if (!profile) {
    redirect(PATH.LOGIN); // 로그인 안 되어 있으면 리디렉트
  }

  return <LifePageClient nickname={profile.nickname || '사용자'} />;
};

export default LifePage;
