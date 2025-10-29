import { axiosInstance } from '../axiosInstance';
import { ReviewResponse } from '@/app/(main)/mypage/utils/review';

export const getPopoverReview = async (
  userId: number,
): Promise<ReviewResponse> => {
  try {
    const response = await axiosInstance.get<ReviewResponse>(
      `/v1/reviews/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('popReview조회실패.', error);
    throw error;
  }
};
