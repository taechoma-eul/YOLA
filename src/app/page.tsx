import { createClient } from '@/lib/utils/supabase/supabase-server';

const HomePage = async () => {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  console.log('user', user?.user_metadata);

  return <div>HomePage</div>;
};
export default HomePage;
