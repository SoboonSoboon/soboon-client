import {
  DividingMeetingsType,
  meetingSearchParamsType,
} from '@/types/meetingsType';

import SharingPageContent from './SharingPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '같이 소분하기 - 소분소분',
  description:
    '구매한 대용량 제품을 함께 나눌 사람을 찾아보세요. 지역별, 상품별로 소분 모임을 탐색하고 참여하여 낭비 없이 알뜰하게 사용하세요. 필요한 만큼만 소분하는 스마트한 소비.',
  keywords: [
    '같이 소분하기',
    '소분',
    '제품 나눔',
    '지역 소분',
    '식품 소분',
    '생활용품 소분',
    '대용량 소분',
    '소분소분 나눔',
    '1인 가구 소분',
    '알뜰 소비',
  ],
  openGraph: {
    title: '같이 소분하기 - 소분소분',
    description:
      '구매한 대용량 제품을 함께 나눌 사람을 찾아보세요. 지역별, 상품별 소분 모임 탐색',
    url: '/sharing',
    type: 'website',
    images: [
      {
        url: '/images/intro_people1.png',
        width: 1200,
        height: 630,
        alt: '같이 소분하기 - 소분소분 ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '같이 소분하기 - 소분소분',
    description: '구매한 대용량 제품을 함께 나눌 사람을 찾아보세요',
    images: ['/images/intro_people1.png'],
  },
  alternates: {
    canonical: '/sharing',
  },
};

async function getSharingMeeting(
  query: URLSearchParams,
): Promise<DividingMeetingsType | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/dividing?${query.toString()}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sharing meeting');
    }

    const responseData = await response.json();

    return responseData.data;
  } catch (error) {
    console.error('Failed to fetch sharing meeting', error);
    return null;
  }
}

export default async function SharingPage({
  searchParams,
}: {
  searchParams: Promise<meetingSearchParamsType>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams({
    province: (params.province as string) || '',
    city: (params.city as string) || '',
    district: (params.district as string) || '',
    title: (params.title as string) || '',
    productType: (params.productType as string) || '',
    sortType: (params.sortType as string) || '',
    page: (params.page as string) || '0',
    size: (params.size as string) || '10',
    status: (params.status as string) || '',
    keyword: (params.keyword as string) || '',
  });

  const initialDividingList = await getSharingMeeting(query);

  return (
    <SharingPageContent
      initialDividingList={initialDividingList}
      query={query}
    />
  );
}
