import localFont from 'next/font/local';

// 메인 본문 폰트: 전체 페이지에 적용되므로 preload 활성화
export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.subset.woff2',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap', // 폰트 로딩 중에도 텍스트 표시
  preload: true, // 첫 화면 렌더링 속도 개선
  weight: '400 700', // 실제 사용되는 weight 범위로 제한 (normal, medium, semibold, bold)
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'arial'], // 찾아서 공부해보기
  adjustFontFallback: 'Arial', // FOIT(Flash of Invisible Text) 방지
});

// 제목/강조 폰트: 첫 화면 인트로 섹션에 사용되므로 preload 활성화
export const memomentKkukkkuk = localFont({
  src: [
    {
      path: '../../public/fonts/memomentKkukkkuk.subset.woff2',
    },
  ],
  variable: '--font-memoment-kkukkkuk',
  display: 'swap',
  weight: '400 900', // 실제 사용되는 weight 범위로 제한 (normal, bold)
  preload: true, // 인트로 섹션에서 즉시 사용되므로 preload
  fallback: ['cursive', 'fantasy'],
  adjustFontFallback: false, // 장식용 폰트이므로 fallback 조정 불필요
});
