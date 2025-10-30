import { IntroSection } from '@/components/intro/IntroSection';
import { IntroScroll } from '@/components/intro/IntroScroll';
import { IntroCarousel } from '@/components/intro/IntroCarousel';
import { IntroAccordion } from '@/components/intro/IntroAccordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
  description:
    '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 소분해요. 비용을 절약하고 낭비를 줄이는 스마트한 소비 문화를 만들어가세요. 1인 가구, 소량 구매자를 위한 최적의 플랫폼.',
  keywords: [
    '소분소분',
    '대용량 소분',
    '공동구매',
    '알뜰 소비',
    '1인 가구',
    '소량 구매',
    '식품 소분',
    '생활용품 공동구매',
    '절약',
    '나눔 경제',
  ],
  openGraph: {
    title: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
    description:
      '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 소분해요. 비용 절약과 낭비 감소를 실현하세요.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/images/intro_people1.png',
        width: 1200,
        height: 630,
        alt: '소분소분 메인 페이지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '소분소분 - 함께 사서, 알뜰하게 나누는 소비',
    description:
      '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 소분해요',
    images: ['/images/intro_people1.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <section>
        <IntroSection />
        <IntroScroll />
        <IntroCarousel />
        <IntroAccordion />
      </section>
    </>
  );
}
