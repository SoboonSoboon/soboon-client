'use client';

import dynamic from 'next/dynamic';

const DynamicFilterBottomSheet = dynamic(
  () =>
    import('@/app/(main)/dividing/components/FilterBottomSheet').then(
      (mod) => mod.FilterBottomSheet,
    ),
  {
    ssr: false,
  },
);

interface DynamicFilterBottomSheetWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DynamicFilterBottomSheetWrapper({
  isOpen,
  onClose,
}: DynamicFilterBottomSheetWrapperProps) {
  return <DynamicFilterBottomSheet isOpen={isOpen} onClose={onClose} />;
}
