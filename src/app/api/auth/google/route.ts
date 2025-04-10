import { NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import { API, NEXT_SERVER_BASE_URL } from '@/constants/api-path';

export const GET = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${NEXT_SERVER_BASE_URL}${API.SOCIAL_LOGIN_CALL_BACK}`
    }
  });

  if (error) {
    console.error('Google OAuth Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(data.url);
};
