'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import LifeInputForm from '@/components/common/post-input-form';
import { PATH } from '@/constants/page-path';

const LifePostPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const missionId = searchParams.get('mission_id');

  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        router.push(PATH.LOGIN);
      }
      setIsLoading(false);
    };

    checkUser();
  }, [router, supabase]);

  if (isLoading) return <div className="p-6 text-center">로딩 중...</div>;

  return (
    <LifeInputForm
      userId={userId!}
      missionId={missionId ?? null} // 없으면 null
    />
  );
};

export default LifePostPage;
