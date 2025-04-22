import Image from 'next/image';
import CHARACTER from '@images/images/cat-in-question-box-original.svg';

const ImageSection = () => {
  return (
    <div className="h-[249px] w-[218px] p-[40px]">
      <Image priority src={CHARACTER} alt="랜덤미션 뽑기 이미지" width={139} height={164} />
    </div>
  );
};

export default ImageSection;
