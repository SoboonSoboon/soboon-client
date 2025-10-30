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
  // JSON-LD 구조화 데이터
  // const jsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'WebSite',
  //   name: '소분소분',
  //   alternateName: 'Soboon',
  //   url: process.env.NEXT_PUBLIC_BASE_URL || 'https://soboon.com',
  //   description:
  //     '대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 나누어 사용하는 플랫폼',
  //   potentialAction: {
  //     '@type': 'SearchAction',
  //     target: {
  //       '@type': 'EntryPoint',
  //       urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://soboon.com'}/shopping?keyword={search_term_string}`,
  //     },
  //     'query-input': 'required name=search_term_string',
  //   },
  // };

  // const organizationJsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Organization',
  //   name: '소분소분',
  //   url: process.env.NEXT_PUBLIC_BASE_URL || 'https://soboon.com',
  //   logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://soboon.com'}/images/green_logo.png`,
  //   description: '함께 사서, 알뜰하게 나누는 소비 플랫폼',
  //   sameAs: [
  //     // SNS 링크들 (실제 운영 시 업데이트)
  //     // 'https://www.facebook.com/soboon',
  //     // 'https://www.instagram.com/soboon_official',
  //     // 'https://blog.naver.com/soboon',
  //   ],
  //   contactPoint: {
  //     '@type': 'ContactPoint',
  //     contactType: 'customer service',
  //     availableLanguage: ['Korean'],
  //   },
  // };

  // const faqJsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'FAQPage',
  //   mainEntity: [
  //     {
  //       '@type': 'Question',
  //       name: '소분소분은 어떤 서비스인가요?',
  //       acceptedAnswer: {
  //         '@type': 'Answer',
  //         text: '소분소분은 대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 나누어 사용할 수 있는 플랫폼입니다. 비용을 절약하고 낭비를 줄일 수 있어요.',
  //       },
  //     },
  //     {
  //       '@type': 'Question',
  //       name: '어떻게 사용하나요?',
  //       acceptedAnswer: {
  //         '@type': 'Answer',
  //         text: '원하는 제품을 찾아보세요. 함께 구매할 사람들과 모임을 만드세요. 제품을 구매하고 나눠받으세요. 사용 후 리뷰를 남겨주세요.',
  //       },
  //     },
  //     {
  //       '@type': 'Question',
  //       name: '비용은 어떻게 계산되나요?',
  //       acceptedAnswer: {
  //         '@type': 'Answer',
  //         text: '제품 가격을 참여 인원으로 나누어 계산합니다. 예를 들어 10,000원짜리 제품을 5명이 함께 구매하면 1인당 2,000원입니다.',
  //       },
  //     },
  //     {
  //       '@type': 'Question',
  //       name: '안전하게 거래할 수 있나요?',
  //       acceptedAnswer: {
  //         '@type': 'Answer',
  //         text: '모든 거래는 플랫폼 내에서 이루어지며, 사용자 인증과 리뷰 시스템을 통해 안전한 거래를 보장합니다. 문제가 있을 경우 고객지원팀에 신고할 수 있어요.',
  //       },
  //     },
  //   ],
  // };

  return (
    <>
      {/* JSON-LD 구조화 데이터 */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      /> */}

      <section>
        <IntroSection />
        <IntroScroll />
        <IntroCarousel />
        <IntroAccordion />
      </section>
    </>
  );
}
