'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const IntroScroll = () => {
  const ref = useScrollAnimation(0.25);

  return (
    <div
      ref={ref}
      className="from-gray-90 w-full bg-gradient-to-b to-black pb-12 sm:pb-24 lg:pb-[195px]"
    >
      <div className="px-6 pt-12 sm:px-12 sm:pt-20 lg:px-0 lg:pt-[131px]">
        <div className="flex flex-col items-center gap-6 sm:gap-10 lg:flex-row lg:items-center lg:justify-end lg:gap-[160px] lg:pr-[181px]">
          <strong
            data-scroll="fade-up"
            className="font-memomentKkukkkuk order-1 text-center text-[28px] font-normal text-[#fff] sm:text-[40px] lg:order-none lg:text-left lg:text-[54px]"
          >
            대용량으로 사니까 비싸고
          </strong>
          <Image
            data-scroll="fade-right"
            src="/images/intro_image1.png"
            alt="intro-scroll"
            width={376}
            height={445}
            className="order-2 w-[280px] sm:w-[320px] lg:order-none lg:w-[376px]"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      <div className="px-6 pt-12 sm:px-12 sm:pt-20 lg:px-0 lg:pt-[131px]">
        <div className="flex flex-col items-center gap-6 sm:gap-10 lg:flex-row lg:items-center lg:justify-start lg:gap-[160px] lg:pl-[181px]">
          <Image
            data-scroll="fade-left"
            src="/images/intro_image2.png"
            alt="intro-scroll"
            width={376}
            height={445}
            className="order-2 w-[280px] sm:w-[320px] lg:order-none lg:w-[376px]"
            style={{ width: 'auto', height: 'auto' }}
          />
          <strong
            data-scroll="fade-up"
            className="font-memomentKkukkkuk order-1 text-center text-[28px] font-normal text-[#fff] sm:text-[40px] lg:order-none lg:text-left lg:text-[54px]"
          >
            못 먹어서 상하거나 안쓰는 짐되고
          </strong>
        </div>
      </div>

      <div className="px-6 pt-12 sm:px-12 sm:pt-20 lg:px-0 lg:pt-[131px]">
        <div className="flex flex-col items-center gap-6 sm:gap-10 lg:flex-row lg:items-center lg:justify-end lg:gap-[160px] lg:pr-[181px]">
          <strong
            data-scroll="fade-up"
            className="font-memomentKkukkkuk order-1 text-center text-[28px] font-normal text-[#fff] sm:text-[40px] lg:order-none lg:text-left lg:text-[54px]"
          >
            버리는 것까지 비용이죠
          </strong>
          <Image
            data-scroll="fade-right"
            src="/images/intro_image3.png"
            alt="intro-scroll"
            width={376}
            height={445}
            className="order-2 w-[280px] sm:w-[320px] lg:order-none lg:w-[376px]"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      <div className="px-6 pt-20 sm:px-12 sm:pt-32 lg:px-0 lg:pt-[367px]">
        <div className="flex justify-center">
          <strong
            data-scroll="fade-up"
            className="font-memomentKkukkkuk text-center text-[28px] font-normal text-[#fff] sm:text-[40px] lg:text-[54px]"
          >
            이런 물건 관리 이제 그만!
          </strong>
        </div>
      </div>
    </div>
  );
};
