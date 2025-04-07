import GonggamItem from '@/components/features/home/main-gonggam-item';
import GonggamPreviewContainer from '@/components/features/home/main-gonggam-preview-container';
import TitleBox from '@/components/features/home/main-gonggam-preview-title-box';

const GonggamPreviewBox = () => {
  return (
    <GonggamPreviewContainer>
      <TitleBox />
      <GonggamItem />
      <GonggamItem />
      <GonggamItem />
    </GonggamPreviewContainer>
  );
};

export default GonggamPreviewBox;
