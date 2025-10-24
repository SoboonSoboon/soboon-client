'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/apis/axiosInstance';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { setTokenInCookie } from '@/action/authAction';

export default function KakaoCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kakaoAuthCode = searchParams.get('code');

  useEffect(() => {
    const handleKakaoCallback = async (kakaoAuthCode: string) => {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        const endpoint = isDev
          ? '/v1/auth/dev/callback/kakao'
          : '/v1/auth/callback/kakao';
        const response = await axiosInstance.get(
          `${endpoint}?code=${kakaoAuthCode}`,
        );
        const data = response.data;

        localStorage.setItem('accessToken', data.accessToken); //todo: 전역상태관리로 관리하기로 변경
        // 쿠키에 저장하는 액션
        await setTokenInCookie(data.accessToken);

        if (data.complete) {
          useAuthStore.setState({
            isLoggedIn: true,
            userId: data.userId,
            userName: data.name,
            userNickname: data.nickname,
            userImage: data.image,
            userToken: data.accessToken,
            userLocation: {
              province: data.province,
              city: data.city,
              district: data.district,
            },
          });
          console.log(data.nickname);
          router.push('/sharing');
        } else {
          console.log('추가 정보 입력이 필요합니다.'); //todo: 추후 토스트로 변경
          setTimeout(() => router.push('/auth/addinfo'), 300);
        }
      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        router.push('/');
      }
    };

    handleKakaoCallback(kakaoAuthCode as string);
  }, [kakaoAuthCode, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-yellow-400"></div>
        <p className="mt-2 text-sm text-gray-50">처리 중...</p>
      </div>
    </div>
  );
}
