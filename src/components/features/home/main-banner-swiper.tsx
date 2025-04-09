'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainBannerSwiper = () => {
  return (
    <section className="mx-auto w-full max-w-[1280px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-60 w-full bg-zinc-300" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-60 w-full bg-zinc-500" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-60 w-full bg-zinc-700" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default MainBannerSwiper;
