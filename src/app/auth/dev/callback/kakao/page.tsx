'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/apis/axiosInstance';
// import { useAuthStore } from '@/apis/auth/hooks/useLogin';

export default function KakaoCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string; error?: string };
}) {
  const router = useRouter();
  const [status, setStatus] = useState('처리 중...');

  useEffect(() => {
    const code = searchParams?.code;
    const error = searchParams?.error;

    const handleKakaoCallback = async (code: string) => {
      try {
        const isDev = process.env.NODE_ENV === 'development';
        const endpoint = isDev
          ? '/v1/auth/dev/callback/kakao'
          : '/v1/auth/callback/kakao';
        const response = await axiosInstance.get(`${endpoint}?code=${code}`);
        const data = response.data;
        sessionStorage.setItem('accessToken', data.accessToken); //todo: 전역상태관리로 관리하기로 변경

        //complete가 true면 로그인, false면 추가 정보 입력 필요
        if (data.complete) {
          console.log('로그인 성공'); //todo: 추후 토스트로 변경
          console.log(data);
          setTimeout(() => router.push('/sharing'), 300);

          // if (data.complete) {
          //   useAuthStore.setState({
          //     isLoggedIn: true,
          //     userId: data.userId,
          //     userName: data.userName,
          //     userNickname: data.userNickname,
          //     userToken: data.accessToken,
          //     userLocation: {
          //       province: data.province,
          //       city: data.city,
          //       district: data.district,

          //     },
          //   });
        } else {
          console.log('추가 정보 입력이 필요합니다.'); //todo: 추후 토스트로 변경
          setTimeout(() => router.push('/auth/addinfo'), 300);
        }
      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        setStatus('오류 발생');
        alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        router.push('/');
      }
    };

    console.log('카카오 콜백:', { code, error });

    if (error) {
      console.error('카카오 인증 실패:', error);
      setStatus('로그인 실패');
      alert('카카오 로그인에 실패했습니다.');
      router.push('/');
      return;
    }

    if (!code) {
      console.error('인증 코드가 없습니다');
      setStatus('인증 코드 없음');
      return;
    }

    handleKakaoCallback(code);
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-yellow-400"></div>
        <p className="mt-2 text-sm text-gray-50">{status}</p>
      </div>
    </div>
  );
}
