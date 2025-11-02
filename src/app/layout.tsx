import { Suspense } from 'react';
import Providers from './providers';
import './globals.css';
import { Footer } from '@/components/Atoms';
import { Header } from '@/components/Molecules';
import HeaderContainer from './Headercontainer';
import AlertHandler from './AlertHandler';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '소분소분',
    template: '%s | 소분소분',
  },
  description: '함께 사서, 알뜰하게 나누는 소비',
  metadataBase: new URL('https://soboon-client-seven.vercel.app'),
  openGraph: {
    siteName: '소분소분',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="pt-15">
        <Providers>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <Suspense fallback={null}>
            <AlertHandler />
          </Suspense>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
