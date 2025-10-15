import { SharingListSection } from './components/SharingListSection';
import { FilterSection } from './components/FilterSection';
import { SideButtonSection } from '@/components';
import { DividingMeetingsType } from '@/types/meetingsType';

async function getSharingMetting(
  query: URLSearchParams,
): Promise<DividingMeetingsType | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/dividing?${query.toString()}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sharing metting');
    }

    const responseData = await response.json();

    return responseData.data;
  } catch (error) {
    console.error('Failed to fetch sharing metting', error);
    return null;
  }
}

export default async function SharingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams({
    province: (params.province as string) || '',
    city: (params.city as string) || '',
    district: (params.district as string) || '',
    item: (params.item as string) || '',
    productType: (params.productType as string) || '',
    sortType: (params.sortType as string) || '',
    page: (params.page as string) || '0',
    size: (params.size as string) || '20',
    status: (params.status as string) || '',
    min: (params.min as string) || '0',
    max: (params.max as string) || '0',
  });
  const sharingMettingList = await getSharingMetting(query);

  console.log(sharingMettingList);
  return (
    <section className="flex gap-10">
      <aside className="sticky top-6 h-[95vh] w-[200px]">
        <FilterSection />
      </aside>
      <div className="flex-1">
        <SharingListSection sharingMettingList={sharingMettingList} />
      </div>
      <SideButtonSection />
    </section>
  );
}
