import { IntroSection } from '@/components/marketplace';
import {
  meetingSearchParamsType,
  ShoppingMeetingsType,
} from '@/types/meetingsType';
import { FilterSection, ShoppingListSection } from './components';
import { SideButtonSection } from '@/components';

// const token = localStorage.getItem('accessToken'); //todo: 전역상태관리로 관리하기로 변경
const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;

async function getShoppingList(
  query: URLSearchParams,
): Promise<ShoppingMeetingsType | null> {
  try {
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
  });

  const shoppingList = await getShoppingList(query);

  return (
    <main className="flex flex-col gap-8 py-8">
      <IntroSection />
      <section className="flex flex-col gap-6">
        <FilterSection />
        <ShoppingListSection shoppingList={shoppingList!.content} />
      </section>
      <SideButtonSection />
    </main>
  );
}
