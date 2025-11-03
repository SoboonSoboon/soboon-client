'use client';

import Image from 'next/image';
import { useSequentialAnimation } from '@/hooks/useScrollAnimation';

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
          className="pt-[110px] text-[28px] leading-tight text-black sm:text-[36px] lg:text-[44px]"
        >
          함께 사서, <br />
          알뜰하게 나누는 소비
        </h1>
        <div className="py-2 sm:py-4">
          <Image
            data-sequence="150"
            src="/images/logo_green.png"
            alt="로고이미지"
            width={250}
            height={250}
            priority
            fetchPriority="high"
            decoding="sync"
            className="h-auto w-auto"
          />
        </div>
        <p data-sequence="300" className="z-10">
          대용량 제품을 같이 사서, 필요한 만큼만 소분해요.
        </p>
      </div>
      <div>
        <div className="absolute bottom-[160px] left-1/2 z-2 flex w-full max-w-[1030px] -translate-x-1/2 items-center justify-center sm:bottom-[120px] md:bottom-[84px]">
          <Image
            data-sequence="450"
            src="/images/intro_people1_116k.png"
            alt="intro-section"
            width={417}
            height={334}
            sizes="(max-width: 640px) 35vw, (max-width: 1024px) 38vw, 412px"
            priority
            className="z-2 h-auto w-[35%] max-w-[417px] object-contain sm:w-[38%] lg:w-[40%]"
          />
          <Image
            data-sequence="600"
            src="/images/intro_people2_151k.png"
            alt="intro-section"
            width={630}
            height={360}
            sizes="(max-width: 1024px) 55vw, 618px"
            priority
            className="z-2 h-auto w-[55%] max-w-[630px] rotate-3 object-contain lg:w-[60%]"
          />
        </div>
        <div className="bg-Green-10 absolute bottom-0 z-1 h-[200px] w-full lg:h-[195px]"></div>
      </div>
    </div>
  );
};
