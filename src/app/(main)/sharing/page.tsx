import {
  DividingMeetingsType,
  meetingSearchParamsType,
} from '@/types/meetingsType';

import { getServerToken } from '@/utils/serverToken';
import SharingPageContent from './SharingPageContent';

async function getSharingMeeting(
  query: URLSearchParams,
): Promise<DividingMeetingsType | null> {
  const accessToken = await getServerToken();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/dividing?${query.toString()}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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
    item: (params.item as string) || '',
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
