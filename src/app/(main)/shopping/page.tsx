import { IntroSection } from '@/components/marketplace';
import {
  meetingSearchParamsType,
  ShoppingMeetingsType,
} from '@/types/meetingsType';
import {
  FilterSection,
  ShoppingListSection,
  ShoppingTagsSection,
} from './components';
import { SideButtonSection } from '@/components';
import { getServerToken } from '@/utils/serverToken';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '같이 장봐요 - 소분소분',
  description:
    '대용량 제품을 함께 구매할 사람을 찾아보세요. 지역별, 카테고리별로 공동구매 모임을 탐색하고 참여하여 알뜰하게 쇼핑하세요. 1인 가구를 위한 스마트한 소비.',
  keywords: [
    '같이 사요',
    '공동구매',
    '대용량 구매',
    '지역 공동구매',
    '식품 공동구매',
    '생활용품 공동구매',
    '알뜰 쇼핑',
    '소분소분 쇼핑',
    '1인 가구 쇼핑',
  ],
  openGraph: {
    title: '같이 사요 - 소분소분',
    description:
      '대용량 제품을 함께 구매할 사람을 찾아보세요. 지역별, 카테고리별 공동구매 모임 탐색',
    url: '/shopping',
    type: 'website',
    images: [
      {
        url: '/images/intro_people1.png', // TODO: 쇼핑 모임 이미지 추가
        width: 1200,
        height: 630,
        alt: '소분소분 같이 사요',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '같이 사요 - 소분소분',
    description: '대용량 제품을 함께 구매할 사람을 찾아보세요',
    images: ['/images/og-shopping.png'],
  },
  alternates: {
    canonical: '/shopping',
  },
};

async function getShoppingList(
  query: URLSearchParams,
): Promise<ShoppingMeetingsType | null> {
  try {
    const token = await getServerToken();

    if (!token) {
      console.error('No access token found');
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/shopping?${query.toString()}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shopping list');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('Failed to fetch shopping list', error);
    return null;
  }
}

export default async function ShoppingPage({
  searchParams,
}: {
  searchParams: Promise<meetingSearchParamsType>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams({
    province: (params.province as string) || '',
    city: (params.city as string) || '',
    district: (params.district as string) || '',
    status: (params.status as string) || '',
    sortType: (params.sortType as string) || '',
    size: (params.size as string) || '10',
    page: (params.page as string) || '0',
  });

  const initialShoppingList = await getShoppingList(query);

  return (
    <main className="flex flex-col gap-8">
      <IntroSection
        src="/images/banner_shopping.png"
        alt="banner-shopping"
        width={1200}
        height={250}
      />
      <section className="flex flex-col gap-4 md:gap-6">
        <ShoppingTagsSection />
        <FilterSection />
        <ShoppingListSection initialShoppingList={initialShoppingList} />
      </section>
      <SideButtonSection />
    </main>
  );
}
