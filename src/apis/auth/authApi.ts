import { axiosInstance } from '../axiosInstance';

export function redirectToKakao() {
  const baseURL = process.env.NEXT_PUBLIC_SOBOON_API_URL;

  if (!baseURL) {
    throw new Error('baseURL is not defined');
  }

  const isDev = process.env.NODE_ENV === 'development';
  const endpoint = isDev
    ? 'v1/auth/dev/redirect/login/kakao' // 개발용
    : 'v1/auth/redirect/login/kakao'; // 프로덕션용

  window.location.href = `${baseURL}${endpoint}`;
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.sessionStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
