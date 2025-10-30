'use client';

import Image from 'next/image';
import { useSequentialAnimation } from '@/hooks/useScrollAnimation';

export const IntroSection = () => {
  const ref = useSequentialAnimation();

  return (
    <div
      ref={ref}
      className="relative h-[calc(100vh-100px)] min-h-[500px] md:h-[calc(100vh-250px)] lg:h-[calc(100vh-195px)]"
    >
      <div className="mt-12 flex flex-col items-center justify-center px-4 text-center sm:mt-20 lg:mt-[130px]">
        <h1
          data-sequence="0"
          className="mb-3 text-[28px] leading-tight text-[#000] sm:mb-4 sm:text-[36px] lg:text-[44px]"
        >
          함께 사서, <br />
          알뜰하게 나누는 소비
        </h1>
        <Image
          data-sequence="150"
          src="/images/green_logo.png"
          alt="intro-section"
          width={150}
          height={42}
          className="mb-4 sm:mb-6 lg:mb-7.5"
          style={{ width: 'auto', height: 'auto' }}
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px"
        />
        <p data-sequence="300">
          대용량 제품을 같이 사서, 필요한 만큼만 소분해요.
        </p>
      </div>
      <Image
        data-sequence="450"
        src="/images/intro_people1.png"
        alt="intro-section"
        width={417}
        height={334}
        className="absolute bottom-[120px] z-2 w-[300px] sm:w-[350px] lg:w-[417px] 2xl:left-[24%]"
      />
      <Image
        data-sequence="600"
        src="/images/intro_people2.png"
        alt="intro-section"
        width={630}
        height={360}
        className="absolute right-[17%] bottom-[84px] z-2 w-[450px] rotate-3 sm:w-[500px] lg:w-[630px]"
      />
      <div className="absolute bottom-0 z-1 h-[100px] w-full bg-[var(--GreenScale-Green10)] sm:h-[140px] lg:h-[195px]"></div>
    </div>
  );
};
