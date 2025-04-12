import Image from 'next/image';
import { MAIN_CHARACTER_URL } from '@/constants/default-image-url';

const ImageSection = () => {
  return (
    <div className="h-[249px] w-[218px] p-[40px]">
      <Image src={MAIN_CHARACTER_URL} alt="랜덤미션 뽑기 이미지" width={124} height={168} />
    </div>
  );
};

export default ImageSection;
