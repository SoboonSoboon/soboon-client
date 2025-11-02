import { Suspense } from 'react';
import Providers from './providers';
import './globals.css';
import { Footer } from '@/components/Atoms';
import { Header } from '@/components/Molecules';
import HeaderContainer from './Headercontainer';
import AlertHandler from './AlertHandler';
import type { Metadata } from 'next';
import { memomentKkukkkuk, pretendard } from './fonts';
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
    <html
      lang="ko"
      className={`${pretendard.variable} ${memomentKkukkkuk.variable}`}
    >
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
