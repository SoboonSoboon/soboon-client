'use client';

import { Button } from '@/components';
import { StatusString } from '@/types/common';

export const AuthorStatusButtonSection = ({
  status,
  handleCloseMeetingAction,
}: {
  status: StatusString;
  handleCloseMeetingAction: () => void;
}) => {
  return (
    <>
      {status === 'RECRUITING' && (
        <Button
          label="모임 마감"
          variant="filled"
          onClick={() => handleCloseMeetingAction()}
        />
      )}

      {status === 'COMPLETED' && (
        <Button label="모집 완료" variant="filled" disabled />
      )}
    </>
  );
};
