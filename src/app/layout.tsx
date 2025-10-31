'use client';

import Providers from './providers';
import './globals.css';
import { Header } from '@/components';
import { Footer } from '@/components/Atoms/Footer';
import HeaderContainer from './Headercontainer';
import AlertHandler from './AlertHandler';

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
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <div>
          <Providers>
            <AlertHandler />
            {children}
          </Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}
