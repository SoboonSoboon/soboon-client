'use client';

import { CreateButton, GoToTopButton } from '@/components/Atoms';

export const SideButtonSection = () => {
  return (
    <div className="fixed right-[13%] bottom-20 flex flex-col gap-1.5">
      <CreateButton />
      <GoToTopButton />
    </div>
  );
};

SideButtonSection.displayName = 'SideButtonSection';
