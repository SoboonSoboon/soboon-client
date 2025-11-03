import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Arial',
});

export const memomentKkukkkuk = localFont({
  src: [
    {
      path: '../../public/fonts/memomentKkukkkuk.woff2',
    },
  ],
  variable: '--font-memoment-kkukkkuk',
  display: 'swap',
  preload: true,
  fallback: ['cursive', 'fantasy'],
  adjustFontFallback: false,
});
