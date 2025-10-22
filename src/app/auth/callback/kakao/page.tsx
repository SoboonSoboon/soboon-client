import { Suspense } from 'react';
import KakaoCallbackHandler from './kakaoCallbackHandler';

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
