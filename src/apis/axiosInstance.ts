import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOBOON_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - 인증 토큰 추가 등 (향후 로그인 기능 구현 시 수정 필요)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;
    // const token = localStorage.getItem('accessToken'); //todo: 전역상태관리로 관리하기로 변경
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error('인증이 필요합니다.');
          break;
        case 403:
          console.error('접근 권한이 없습니다.');
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 내부 오류가 발생했습니다.');
          break;
        default:
          console.error('알 수 없는 오류가 발생했습니다.');
      }
    }

    return Promise.reject(error);
  },
);
