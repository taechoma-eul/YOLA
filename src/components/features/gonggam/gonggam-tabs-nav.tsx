'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { tabs } from '@/constants/gonggam-category';

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
