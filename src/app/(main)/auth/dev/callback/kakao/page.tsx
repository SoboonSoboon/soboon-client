import { Suspense } from 'react';
import DevKakaoCallbackHandler from './KakaoCallbackHandler';

export default function devKakaoCallbackPage() {
  return (
    <Suspense>
      <DevKakaoCallbackHandler />
    </Suspense>
  );
}
