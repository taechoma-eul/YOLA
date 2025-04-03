'use client';
import { usePathname } from 'next/navigation';

const PostMissionClear = () => {
  const decodedPath = decodeURIComponent(usePathname());
  return <div>pathname: {decodedPath}</div>;
};

export default PostMissionClear;
