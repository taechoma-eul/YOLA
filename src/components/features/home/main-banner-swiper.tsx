'use client';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainBanner from '@/components/features/home/main-banner';
import type { Banner } from '@/types/main-banner';

const MainBannerSwiper = () => {
  const bannerProperty: Banner[] = [
    {
      title: '너 혼자 살아도 괜차낭.',
      text: `혼자만의 일상을 가볍게 기록하면서, 같은 '혼자족'끼리 공감하고 공유해요`,
      color: 'orange'
    },
    { title: '갓생 살기 챌린지', text: 'YOLA가 처음이신가요? YOLA 챌린지부터 둘러보세요!', color: 'red' },
    {
      title: '작지만 특별한 미션',
      text: '오늘 하루, 나를 위한 작은 도전. 어떤 미션이 나올지 기대해보세요!',
      color: 'blue'
    }
  ];

  return (
    <section className="mx-auto w-full max-w-[1280px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="my-swiper h-60"
      >
        {bannerProperty.map((data, index) => (
          <SwiperSlide key={index}>
            <MainBanner title={data.title} text={data.text} color={data.color} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-4 inline-flex items-center justify-center gap-2" />
    </section>
  );
};

export default MainBannerSwiper;
