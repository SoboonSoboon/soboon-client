import { axiosInstance } from '../axiosInstance';
import { profileDataType } from '@/types/authType';

export function redirectToKakao() {
  const baseURL = process.env.NEXT_PUBLIC_SOBOON_API_URL;

  const isDev = process.env.NODE_ENV === 'development';
  const endpoint = isDev
    ? '/v1/auth/dev/redirect/login/kakao' // 개발용
    : '/v1/auth/redirect/login/kakao'; // 프로덕션용

  if (!baseURL) {
    throw new Error('baseURL is not defined');
  } else {
    window.location.href = `${baseURL}${endpoint}`;
  }
}

export const getMyProfileData = async () => {
  const response = await axiosInstance.get('/v1/auth/me');
  return response.data;
};

export const postMyProfileData = async (data: profileDataType) => {
  const formData = {
    nickname: data.nickname,
    image: data.image,
    province: data.province,
    city: data.city,
    district: data.district,
    detail: data.detail,
  };
  const response = await axiosInstance.post(
    '/v1/auth/additional-info',
    formData,
  );
  return response.data;
};
