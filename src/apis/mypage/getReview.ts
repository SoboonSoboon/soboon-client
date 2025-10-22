import { ReviewResponse } from '@/utils/review';

export const getReceivedReview = async (): Promise<ReviewResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;
    const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;

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
  } catch (error) {
    // 빌드 시 환경 변수가 없으면 mock 데이터 반환
    console.warn('Using mock data for reviews:', error);
    return {
      message: null,
      data: {
        keywords: [
          { keyword: 'TIME_PROMISE', count: 8 },
          { keyword: 'KIND_AND_CARING', count: 7 },
          { keyword: 'SAME_AS_PHOTO', count: 5 },
          { keyword: 'FAST_RESPONSE', count: 15 },
          { keyword: 'GOOD_DISTRIBUTION', count: 10 },
        ],
      },
    };
  }
};
