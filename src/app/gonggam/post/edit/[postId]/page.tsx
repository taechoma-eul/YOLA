// app/gonggam/post/edit/[post_id]/page.tsx

import GonggamPostInputForm from '@/components/features/gonggam/gonggam-post-input-form';
import { getGonggamPostById } from '@/lib/utils/api/gonggam-post.api';

interface GonggamEditPageProps {
  params: { post_id: string };
}

const GonggamEditPage = async ({ params }: GonggamEditPageProps) => {
  const postId = Number(params.post_id);
  const post = await getGonggamPostById(postId);

  return (
    <GonggamPostInputForm
      isEditMode
      defaultValues={{
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags ?? [],
        imageUrls: post.image_urls ?? []
      }}
    />
  );
};

export default GonggamEditPage;
