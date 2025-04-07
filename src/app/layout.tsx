import type { Metadata } from 'next';
import TQProvider from '@/lib/providers/TQProvider';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '너 혼자 산다',
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
        <TQProvider>
          <Header />
          <main className="mx-auto flex min-h-[calc(100vh-150px)] w-full max-w-[1280px] flex-col items-center pt-[150px]">
            {children}
          </main>
          <Toaster />
        </TQProvider>
        <Footer />
      </body>
    </html>
  );
}
