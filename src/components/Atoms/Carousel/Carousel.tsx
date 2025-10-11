'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CarouselProps {
  carouselImages: string[];
  width?: number;
  height?: number;
  className?: string;
}

export const Carousel = ({
  carouselImages,
  width = 700,
  height = 600,
  className,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1); // 현재 이미지 인덱스
  const [isMoving, setIsMoving] = useState<boolean>(true); // 이미지 이동 중인지
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // 버튼 비활성화 여부

  const newCarouselImagesArray = [
    carouselImages[carouselImages.length - 1],
    ...carouselImages,
    carouselImages[0],
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // 첫 번째 이미지일 때 300ms 후 마지막 이미지로 이동
    if (currentIndex === 0) {
      timer = setTimeout(() => {
        setCurrentIndex(newCarouselImagesArray.length - 2);
        setIsMoving(false);
      }, 300);
    }

    // 마지막 이미지일 때 300ms 후 첫 번째 이미지로 이동
    else if (currentIndex === newCarouselImagesArray.length - 1) {
      timer = setTimeout(() => {
        setCurrentIndex(1);
        setIsMoving(false);
      }, 300);
    }

    setTimeout(() => {
      setIsDisabled(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, newCarouselImagesArray.length]);

  // 이전 버튼
  const prevButton = () => {
    setIsMoving(true);
    setIsDisabled(true);
    setCurrentIndex((prev) => (prev -= 1));
  };

  // 다음 버튼
  const nextButton = () => {
    setIsMoving(true);
    setIsDisabled(true);
    setCurrentIndex((prev) => (prev += 1));
  };

  // 이미지가 1장일 때
  if (carouselImages.length === 1) {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Image
          src={carouselImages[0]}
          alt="캐러셀 이미지"
          width={width}
          height={height}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="flex size-full overflow-hidden">
        <div
          className={`flex size-full transition-transform duration-300 ${
            isMoving ? 'transition-transform duration-300' : 'transition-none'
          }`}
          style={{ transform: `translateX(-${currentIndex * width}px)` }}
        >
          {newCarouselImagesArray.map((image, index) => (
            <Image
              src={image}
              alt="캐러셀 이미지"
              width={width}
              height={height}
              key={index}
            />
          ))}
        </div>
      </div>
      <button
        className="absolute top-[50%] left-0 translate-y-[-50%] bg-white p-3"
        onClick={prevButton}
        disabled={isDisabled}
      >
        {'<'}
      </button>
      <button
        className="absolute top-[50%] right-0 translate-y-[-50%] bg-white p-3"
        onClick={nextButton}
        disabled={isDisabled}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
