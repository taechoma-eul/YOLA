'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: '일상공유', slug: 'daily' },
  { label: '꿀팁공유', slug: 'tip' },
  { label: '여기추천', slug: 'place' },
  { label: '밋업', slug: 'meetup' }
];

const baseClass = 'py-1 px-4';
const activeClass = 'border-b-2 border-black font-bold';
const inactiveClass = 'text-gray-400 hover:text-black';

export function TabsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 border-b pb-2">
      {tabs.map((tab) => {
        const isActive = pathname?.startsWith(`/gonggam/${tab.slug}`);
        const tabClass = `${baseClass} ${isActive ? activeClass : inactiveClass}`;

        return (
          <Link key={tab.slug} href={`/gonggam/${tab.slug}`} className={tabClass}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
