'use client';

import Calendar from '@/components/features/life/calendar';
import SoloLifeList from '@/components/features/life/solo-life-list';
import { PATH } from '@/constants/page-path';
import { useLifePostsByMonth } from '@/lib/hooks/queries/use-life-posts-by-month';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export const getToday = (): string => {
  const kst = new Date();
  const yyyy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, '0');
  const dd = String(kst.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const LifePage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [calendarMonth, setCalendarMonth] = useState(getToday().slice(0, 7)); // 'YYYY-MM'

  const { data: posts = [] } = useLifePostsByMonth(calendarMonth);

  // 날짜별 점 데이터 생성
  const dotMap = useMemo(() => {
    const map: Record<string, Set<'mission' | 'normal'>> = {};
    posts.forEach((post) => {
      const date = post.date.slice(0, 10); // YYYY-MM-DD
      const type = post.mission_id !== null ? 'mission' : 'normal';
      if (!map[date]) map[date] = new Set();
      map[date].add(type);
    });
    return map;
  }, [posts]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="ml-auto mr-auto min-h-[750px] w-[90%] text-center">
        <Calendar
          setDate={setSelectedDate}
          selectedDate={selectedDate}
          dotMap={dotMap}
          onMonthChange={(month) => setCalendarMonth(month)}
        />
      </div>

      <div className="flex items-center justify-between px-20">
        <h2 className="text-lg font-semibold">{selectedDate} &lt;닉네임&gt;님의 혼자 라이프</h2>

        <Link href={PATH.LIFE_POST} className="text-sm text-blue-600 hover:underline">
          일기 작성하기 &gt;
        </Link>
      </div>
      <div className="min-h-[300px] px-10">
        <SoloLifeList selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default LifePage;
