import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.subset.woff2',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: false,
  weight: '400 700',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'arial'],
  adjustFontFallback: 'Arial',
});

export const memomentKkukkkuk = localFont({
  src: [
    {
      path: '../../public/fonts/memomentKkukkkuk.subset.woff2',
    },
  ],
  variable: '--font-memoment-kkukkkuk',
  display: 'swap',
  weight: '400 900',
  preload: true,
  fallback: ['cursive', 'fantasy'],
  adjustFontFallback: false,
});
