'use client';

import dynamic from 'next/dynamic';

const DynamicIntroScroll = dynamic(
  () => import('../IntroScroll').then((mod) => mod.IntroScroll),
  { ssr: false },
);

const DynamicIntroCarousel = dynamic(
  () => import('../IntroCarousel').then((mod) => mod.IntroCarousel),
  { ssr: false },
);

const DynamicIntroAccordion = dynamic(
  () => import('../IntroAccordion').then((mod) => mod.IntroAccordion),
  { ssr: false },
);

export function DynamicIntroSectionsWrapper() {
  return (
    <>
      <DynamicIntroScroll />
      <DynamicIntroCarousel />
      <DynamicIntroAccordion />
    </>
  );
}
