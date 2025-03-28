import type { Metadata } from 'next';
import './globals.css';
import TQProvider from '@/lib/providers/TQProvider';

export const metadata: Metadata = {
  title: '니 혼자 산다',
  description: '혼자 사는 사람들의 소소한 일상 기록'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TQProvider>{children}</TQProvider>
      </body>
    </html>
  );
}
