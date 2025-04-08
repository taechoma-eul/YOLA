'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { Enums } from '@/types/supabase';

const categorySlugs: Record<Enums<'categorys'>, string> = {
  일상공유: 'daily',
  꿀팁공유: 'tip',
  여기추천: 'place',
  밋업: 'meetup'
};

// Enum 기반 Tabs 라벨 동적 생성
const createTabs = (slugs: Record<Enums<'categorys'>, string>) =>
  Object.entries(slugs).map(([label, slug]) => ({ label, slug }));

const tabs = createTabs(categorySlugs); // {label: '꿀팁공유', slug: 'tip'}[]

export function TabsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 border-b pb-2">
      {tabs.map((tab) => (
        <Link
          key={tab.slug}
          href={`/gonggam/${tab.slug}`}
          className={clsx(
            '-mb-2 pb-2',
            pathname?.startsWith(`/gonggam/${tab.slug}`)
              ? 'border-b-2 border-black font-bold'
              : 'text-gray-400 hover:text-black'
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
