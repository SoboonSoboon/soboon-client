'use client';

import Image from 'next/image';
import { useSequentialAnimation } from '@/hooks/useScrollAnimation';
import SoboonLogo from '@/app/(main)/auth/components/SoboonLogo';

export const IntroSection = () => {
  const ref = useSequentialAnimation();

  return (
    <div
      ref={ref}
      className="relative h-[calc(95vh-59px)] sm:h-[calc(100vh-59px)]"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1
          data-sequence="0"
          className="pt-[130px] text-[28px] leading-tight text-black sm:text-[36px] lg:text-[44px]"
        >
          함께 사서, <br />
          알뜰하게 나누는 소비
        </h1>
        <div className="py-4 sm:py-6">
          <SoboonLogo
            sequence={true}
            color="#00B460"
            height={50}
            gap={7}
            iconHeight={64}
          />
        </div>
        <p data-sequence="300" className="pt-2">
          대용량 제품을 같이 사서, 필요한 만큼만 소분해요.
        </p>
      </div>
      <div>
        <div className="absolute bottom-[84px] left-1/2 z-2 flex w-full max-w-[1030px] -translate-x-1/2 items-center justify-center">
          <Image
            data-sequence="450"
            // src="/images/intro_people1.png"
            src="/images/intro_people1-2.png"
            alt="intro-section"
            width={417}
            height={334}
            className="z-2 h-auto w-[35%] max-w-[417px] object-contain sm:w-[38%] lg:w-[40%]"
          />
          <Image
            data-sequence="600"
            // src="/images/intro_people2.png"
            src="/images/intro_people2-2.png"
            alt="intro-section"
            width={630}
            height={360}
            className="z-2 h-auto w-[55%] max-w-[630px] rotate-3 object-contain lg:w-[60%]"
          />
        </div>
        <div className="bg-Green-10 absolute bottom-0 z-1 h-[120px] w-full sm:h-[140px] lg:h-[195px]"></div>
      </div>
    </div>
  );
};
