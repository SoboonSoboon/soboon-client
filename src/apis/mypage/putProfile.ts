import { ProfileUpdateData } from '@/app/(main)/mypage/utils/profile';
import { axiosInstance } from '../axiosInstance';

export const putProfile = async (data: ProfileUpdateData) => {
  const response = await axiosInstance.put('/v1/auth/me', data);
  return response.data;
};
