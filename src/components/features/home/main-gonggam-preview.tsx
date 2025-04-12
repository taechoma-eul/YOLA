import { getGonggamPreviewList } from '@/lib/utils/api/gonggam-posts.api';
import GonggamItem from '@/components/features/home/main-gonggam-item';
import GonggamPreviewContainer from '@/components/features/home/main-gonggam-preview-container';
import TitleSection from '@/components/features/home/main-gonggam-preview-title-section';

const GonggamPreviewBox = async () => {
  try {
    const postList = await getGonggamPreviewList();

    return (
      <GonggamPreviewContainer>
        <TitleSection />
        {postList.length > 0 ? (
          postList.map((item) => <GonggamItem key={item.id} post={item} />)
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </GonggamPreviewContainer>
    );
  } catch (error) {
    return (
      <GonggamPreviewContainer>
        <TitleSection />
        <p className="my-auto">게시글 불러오기에 실패했습니다.</p>
      </GonggamPreviewContainer>
    );
  }
};

export const revalidate = 86400; // 24시간 주기로 인기글 업데이트

export default GonggamPreviewBox;
