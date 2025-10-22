import { Suspense } from 'react';
import KakaoCallbackHandler from './KakaoCallbackHandler';

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <KakaoCallbackHandler />
    </Suspense>
  );
}
