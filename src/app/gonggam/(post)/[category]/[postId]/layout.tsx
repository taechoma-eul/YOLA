import type { Children } from '@/types/children';

const PostDetailLayout = ({ children }: Children) => {
  return (
    <div className="w-full p-8 pt-0">
      <div className="mt-6">{children}</div>
    </div>
  );
};

export default PostDetailLayout;
