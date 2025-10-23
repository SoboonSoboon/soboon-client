import {
  DividingMeetingsType,
  meetingSearchParamsType,
} from '@/types/meetingsType';
import { IntroSection } from '@/app/(marketplace)/components';
import {
  FilterSection,
  SharingListSection,
} from '@/app/(marketplace)/sharing/components';

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
  searchParams: Promise<meetingSearchParamsType>;
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
  });
  const sharingMettingList = await getSharingMetting(query);

  return (
    <main className="flex flex-col gap-8 py-8">
      <IntroSection />
      <section className="flex gap-10">
        <aside className="sticky top-6 h-[95vh] w-[200px]">
          <FilterSection />
        </aside>
        <div className="flex-1">
          <SharingListSection sharingMettingList={sharingMettingList} />
        </div>
      </section>
    </main>
  );
}
