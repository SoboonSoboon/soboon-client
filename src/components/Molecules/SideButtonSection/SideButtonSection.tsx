'use client';

import { ShoppingMeetingRegisterModal } from '@/app/(marketplace)/components';
import { CreateButton, GoToTopButton } from '@/components/Atoms';
import { useState } from 'react';

export const SideButtonSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [meetingType, setMeetingType] = useState<'shopping' | 'sharing'>(
    'shopping',
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = (type: 'shopping' | 'sharing') => {
    setIsOpen(true);
    setMeetingType(type);
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
      <ShoppingMeetingRegisterModal
        meetingType={meetingType}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};

SideButtonSection.displayName = 'SideButtonSection';
