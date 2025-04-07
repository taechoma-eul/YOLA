import GonggamItem from '@/components/features/home/main-gonggam-item';
import GonggamPreviewContainer from '@/components/features/home/main-gonggam-preview-container';
import TitleBox from '@/components/features/home/main-gonggam-preview-title-box';
import { getGonggamPosts } from '@/lib/utils/api/gonggam-posts.api';

const GonggamPreviewBox = async () => {
  const gonggamPosts = await getGonggamPosts();

  const previewList = [...gonggamPosts].slice(0, 3);

  return (
    <GonggamPreviewContainer>
      <TitleBox />
      {previewList.map((item) => (
        <GonggamItem key={item.id} post={item} />
      ))}
    </GonggamPreviewContainer>
  );
};

export default GonggamPreviewBox;
