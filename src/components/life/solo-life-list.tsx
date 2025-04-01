import React from 'react';
import SoloLifeCard from './solo-life-card';
import { SoloLifeCardType } from '@/types/solo-life';

const SoloLifeList = () => {
  const emptyList: SoloLifeCardType[] = [
    {
      img: 'https://via.placeholder.com/300',
      title: '엉멍이_박살난_하루 오늘_운동땅_예반데',
      content: '혼자 따릉이 타고 하남까지 갔다!마쟈요 \n엉덩이가 박살나버렸다😌',
      date: '2025.02.27 | 22:34',
      id: '1'
    },
    { img: 'https://via.placeholder.com/300', title: '제목2', content: '내용2', date: '2025.03.01 | 15:00', id: '2' },
    { img: 'https://via.placeholder.com/300', title: '제목3', content: '내용3', date: '2025.03.02 | 10:15', id: '3' }
  ];

  return (
    <div className="m-4 grid grid-cols-1 gap-4 overflow-auto text-left sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {emptyList.map((data: SoloLifeCardType) => (
        <SoloLifeCard key={data.id} {...data} />
      ))}
    </div>
  );
};

export default SoloLifeList;
