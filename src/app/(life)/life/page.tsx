'use client';

import Calendar from '@/components/life/calendar';
import SoloLifeList from '@/components/life/solo-life-list';
import { useState } from 'react';

const LifePage = () => {
  const [date, setDate] = useState<string>(''); // 오늘 날짜로 초기화

  return (
    <div className="flex flex-col gap-4">
      <div className="ml-auto mr-auto w-[90%] text-center">
        <Calendar setDate={setDate} />
      </div>

      <h2 className="ml-[12px] text-lg font-semibold">{date} &lt;닉네임&gt;님의 혼자 라이프</h2>

      <SoloLifeList />
    </div>
  );
};

export default LifePage;
