import { getUserMetadata } from '@/lib/utils/api/auth-action';

const HomePage = async () => {
  const user = await getUserMetadata();

  console.log('user', user);

  return <div>HomePage</div>;
};
export default HomePage;
