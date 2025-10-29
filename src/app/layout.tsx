import Providers from './providers';
import './globals.css';
import { Header } from '@/components';
import { Footer } from '@/components/Atoms/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="pt-15">
        <Header />
        <div>
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
    icon: '/icons/soboon_favicon.svg',
  },
};
