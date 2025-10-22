import {
  ReviewResponse,
  ReviewTargetsResponse,
  CreateHostReviewRequest,
  CreateParticipantReviewRequest,
} from '@/utils/review';

const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;
const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;

export const getReceivedReview = async (): Promise<ReviewResponse> => {
  try {
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

export const getReviewTargets = async (): Promise<ReviewTargetsResponse> => {
  try {
    const response = await fetch(`${baseUrl}/v1/reviews/targets`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch review targets');
    }

    return response.json();
  } catch (error) {
    // 빌드 시 환경 변수가 없으면 mock 데이터 반환
    console.warn('Using mock data for review targets:', error);
    return {
      message: null,
      data: {
        eventId: 1001,
        category: 'SHOPPING',
        attendees: [
          {
            attendeeId: 101,
            nickname: '김철수',
            profileImageUrl: '/images/dummy_profile.png',
            alreadyReviewed: false,
            host: false,
          },
          {
            attendeeId: 102,
            nickname: '이영희',
            profileImageUrl: '/images/dummy_profile.png',
            alreadyReviewed: true,
            host: false,
          },
        ],
      },
    };
  }
};

export const createHostReview = async (
  data: CreateHostReviewRequest,
): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/v1/reviews/host`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create host review');
    }
  } catch (error) {
    console.error('Error creating host review:', error);
    throw error;
  }
};

// 4. 참여자→주최자 리뷰 작성 (POST /v1/reviews/participant)
export const createParticipantReview = async (
  data: CreateParticipantReviewRequest,
): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/v1/reviews/participant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create participant review');
    }
  } catch (error) {
    console.error('Error creating participant review:', error);
    throw error;
  }
};
