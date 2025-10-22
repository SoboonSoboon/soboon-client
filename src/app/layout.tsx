import Providers from './providers';
import './globals.css';
import { Header } from '@/components';

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
        <div className="mx-auto w-[1200px]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
