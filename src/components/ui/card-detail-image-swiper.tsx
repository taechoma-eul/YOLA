import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import type { LifePostWithImageUrls } from '@/types/life-post';
import Image from 'next/image';

const SPACE_BETWEEN = 30;
const SLIDES_PER_VIEW = 1.2;
/** 카드 디테일 모달에 들어가는 이미지 슬라이드 구현을 위한 스와이퍼 컴포넌트 */
export const ImageSwiper = ({ image_urls }: Pick<LifePostWithImageUrls, 'image_urls'>) => {
  return (
    <Swiper spaceBetween={SPACE_BETWEEN} slidesPerView={SLIDES_PER_VIEW}>
      {image_urls.map((url) => (
        <SwiperSlide key={url}>
          <div className="relative aspect-square w-full">
            <Image src={url} alt="post image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
