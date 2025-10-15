'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        setStatus('백엔드 처리 중...');

        const baseURL = process.env.NEXT_PUBLIC_SOBOON_API_URL;

        const response = await fetch(
          `${baseURL}v1/auth/dev/callback/kakao?code=${code}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`처리 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log('응답:', data);

        //응답에 accessToken이 있으면 로그인, 없으면 추가 정보 입력 필요

        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          console.log('Access Token 저장 완료');
          alert('로그인 성공'); //추후 토스트로 변경
          setTimeout(() => router.push('/sharing'), 300);
        } else {
          alert('추가 정보 입력이 필요합니다.'); //추후 토스트로 변경
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
