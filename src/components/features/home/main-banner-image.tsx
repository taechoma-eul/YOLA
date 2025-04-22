import Image from 'next/image';

const MainBannerImage = ({ imageUrl, index }: { imageUrl: string; index: number }) => {
  return <Image src={imageUrl} alt={`메인 배너 이미지 ${index}`} width={1280} height={238} />;
};

export default MainBannerImage;
