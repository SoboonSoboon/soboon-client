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
        alt="장보기 배너"
        className="overflow-hidden rounded-lg"
        width={2400}
        height={500}
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
