import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap', // FOIT 방지, 폰트 로딩 전 fallback 폰트 표시
  preload: true, // 폰트 우선 로드 (중요!)
  fallback: ['system-ui', 'arial'], // fallback 폰트 지정
  adjustFontFallback: 'Arial', // 레이아웃 시프트 최소화
});

export const memomentKkukkkuk = localFont({
  src: [
    {
      path: '../../public/fonts/memomentKkukkkuk.woff2',
    },
  ],
  variable: '--font-memoment-kkukkkuk',
  display: 'swap', // FOIT 방지
  preload: false, // 제목용이므로 preload는 false (본문폰트만 preload)
  fallback: ['cursive', 'fantasy'], // 제목용 fallback
  adjustFontFallback: false, // 장식 폰트는 fallback 조정 불필요
});
