import { Carousel } from '../Atoms';

export const IntroCarousel = () => {
  const carouselImages = [
    '/images/shopping_carousel_image.png',
    '/images/dividing_carousel_image.png',
    '/images/mypage_carousel_image.png',
  ];

  return (
    <div className="h-[951px] w-full bg-[var(--GreenScale-Green50)]">
      <div className="flex flex-col items-center justify-center gap-[53px] pt-[152px]">
        <strong className="font-memomentKkukkkuk text-[44px] font-normal text-[#fff]">
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
