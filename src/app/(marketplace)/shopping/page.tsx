import { SideButtonSection } from '@/components';
import { FilterSection } from './components/FilterSection';
import { ShoppingListSection } from './components/ShoppingListSection';
import { ShoppingMeetingsType } from '@/types/meetingsType';
import { IntroSection } from '../components/IntroSection';

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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams({
    province: (params.province as string) || '',
    city: (params.city as string) || '',
    district: (params.district as string) || '',
    sortType: (params.sortType as string) || '',
  });

  const shoppingList = await getShoppingList(query);

  console.log(shoppingList);

  return (
    <section>
      <IntroSection />
      <FilterSection />
      <ShoppingListSection shoppingList={shoppingList!.content} />
      <SideButtonSection />
    </section>
  );
}
