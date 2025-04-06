import { getUniqueMissionType } from '@/lib/utils/api/checklist.api';
import { Swiper, SwiperSlide } from 'swiper/react';
import ChecklistClient from '@/components/features/checklist/checklist-client';
import MainBannerSwiper from '@/components/features/home/main-banner-swiper';

const HomePage = async () => {
  const uniqueTypes = await getUniqueMissionType();

  return (
    <>
      <MainBannerSwiper />
      {/* <ChecklistClient uniqueTypes={uniqueTypes} /> */}
    </>
  );
};

export default HomePage;
