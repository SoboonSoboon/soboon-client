'use client';

import { Carousel } from '../Atoms';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const IntroCarousel = () => {
  const ref = useScrollAnimation(0.3);

  const carouselImages = [
    '/images/shopping_carousel_image.png',
    '/images/dividing_carousel_image.png',
    '/images/mypage_carousel_image.png',
  ];

  return (
    <div ref={ref} className="h-[951px] w-full bg-[var(--GreenScale-Green50)]">
      <div className="flex flex-col items-center justify-center gap-[53px] pt-[152px]">
        <strong
          data-scroll="fade-up"
          className="font-memomentKkukkkuk text-[44px] font-normal text-[#fff]"
        >
          소분소분에서 이렇게 함께 해요
        </strong>
        <Carousel
          carouselImages={carouselImages}
          imageWidth={500}
          imageHeight={400}
        />
      </div>
    </div>
  );
};
