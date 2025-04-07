import { getGonggamPreviewList } from '@/lib/utils/api/gonggam-posts.api';
import GonggamItem from '@/components/features/home/main-gonggam-item';
import GonggamPreviewContainer from '@/components/features/home/main-gonggam-preview-container';
import TitleBox from '@/components/features/home/main-gonggam-preview-title-box';

const GonggamPreviewBox = async () => {
  const postList = await getGonggamPreviewList();

  return (
    <GonggamPreviewContainer>
      <TitleBox />
      {postList.length > 0 ? (
        postList.map((item) => <GonggamItem key={item.id} post={item} />)
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </GonggamPreviewContainer>
  );
};

export const revalidate = 3600; // 1시간마다 업데이트

export default GonggamPreviewBox;
