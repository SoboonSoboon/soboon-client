import Providers from './providers';
import './globals.css';
import { Header } from '@/components';
import { Footer } from '@/components/Atoms/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <Header />
        <div className="mx-auto w-full max-w-[1200px] px-4">
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}

export const metadata = {
  title: '소분소분',
  description: '함께 사서, 알뜰하게 나누는 소비',
  icons: {
    icon: '/icons/soboon-logo.svg',
  },
};
