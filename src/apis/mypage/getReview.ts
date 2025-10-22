import { ReviewResponse } from '@/utils/review';

export async function getReceivedReview(): Promise<ReviewResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/reviews/me`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  return response.json();
}
