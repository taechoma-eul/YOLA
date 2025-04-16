import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import type { LifePostWithImageUrls } from '@/types/life-post';
import Image from 'next/image';

const SPACE_BETWEEN = 16;
const SLIDES_PER_VIEW = 1.9;
/** 카드 디테일 모달에 들어가는 이미지 슬라이드 구현을 위한 스와이퍼 컴포넌트 */
export const ImageSwiper = ({ image_urls }: Pick<LifePostWithImageUrls, 'image_urls'>) => {
  return (
    <Swiper spaceBetween={SPACE_BETWEEN} slidesPerView="auto" slidesOffsetAfter={0} className="mb-[44px]">
      {image_urls.map((url) => (
        <SwiperSlide key={url} className="!w-[300px] last:!mr-0 cursor-pointer">
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-[12px]">
            <Image src={url} alt="post image" fill className="object-cover" sizes="300px" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
