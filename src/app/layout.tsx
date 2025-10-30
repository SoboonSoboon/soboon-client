import Providers from './providers';
import './globals.css';
import { Header } from '@/components';
import { Footer } from '@/components/Atoms/Footer';
import type { Metadata, Viewport } from 'next';
import HeaderContainer from './Headercontainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="pt-15">
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <div>
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#00b460',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://soboon.com',
  ),
  title: {
    default: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
    template: '%s | 소분소분',
  },
  description:
    '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 나누어 사용하는 플랫폼. 비용을 절약하고 낭비를 줄이는 스마트한 소비 문화를 만들어가세요.',
  keywords: [
    '소분',
    '공동구매',
    '대용량 제품',
    '절약',
    '알뜰 소비',
    '나눔',
    '공유 경제',
    '소분소분',
    '식품 소분',
    '생활용품 소분',
    '1인 가구',
  ],
  authors: [{ name: '소분소분' }],
  creator: '소분소분',
  publisher: '소분소분',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [{ url: '/icons/soboon_favicon.svg', type: 'image/svg+xml' }],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: '소분소분',
    title: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
    description:
      '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 나누어 사용하는 플랫폼. 비용 절약과 낭비 감소를 실현하세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
    description:
      '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 나누어 사용하는 플랫폼',
    images: ['/images/og-image.png'],
    creator: '@soboon',
  },

  alternates: {
    canonical: '/',
  },
  category: 'shopping',
};
