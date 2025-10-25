'use client';

import { CreateButton, GoToTopButton } from '@/components/Atoms';
import { useRouter } from 'next/navigation';

export const SideButtonSection = () => {
  const router = useRouter();

  const handleOpen = (type: 'shopping' | 'sharing') => {
    router.push(`/${type}/register`);
  };

  return (
    <>
      <div className="fixed right-[13%] bottom-20 flex flex-col gap-1.5">
        <CreateButton
          actionHandlers={{
            shopping: () => handleOpen('shopping'),
            sharing: () => handleOpen('sharing'),
          }}
        />
        <GoToTopButton />
      </div>
    </>
  );
};

SideButtonSection.displayName = 'SideButtonSection';
