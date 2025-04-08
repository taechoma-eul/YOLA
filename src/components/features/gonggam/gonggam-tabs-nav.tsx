'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const tabs = [
  { label: '일상공유', slug: 'daily' },
  { label: '꿀팁공유', slug: 'tip' },
  { label: '여기추천', slug: 'place' },
  { label: '밋업', slug: 'meetup' }
];

export function TabsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 border-b pb-2">
      {tabs.map((tab) => (
        <Link
          key={tab.slug}
          href={`/gonggam/${tab.slug}`}
          className={clsx(
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
