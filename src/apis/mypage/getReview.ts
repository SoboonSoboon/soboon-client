import { ReviewResponse } from '@/utils/review';

export const getReceivedReview = async (): Promise<ReviewResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;
  const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_SOBOON_API_URL is not defined');
  }

  if (!token) {
    throw new Error('NEXT_PUBLIC_SOBOON_API_TOKEN is not defined');
  }

  const response = await fetch(`${baseUrl}/v1/reviews/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  return response.json();
};
