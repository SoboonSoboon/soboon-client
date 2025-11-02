'use client';

import dynamic from 'next/dynamic';

const DynamicSideButtonSection = dynamic(
  () => import('@/components/Molecules').then((mod) => mod.SideButtonSection),
  {
    ssr: false,
  },
);

export function DynamicSideButtonSectionWrapper() {
  return <DynamicSideButtonSection />;
}
