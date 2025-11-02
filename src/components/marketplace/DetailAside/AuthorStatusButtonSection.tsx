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
          aria-label="모임 마감 버튼"
          variant="filled"
          onClick={() => handleCloseMeetingAction()}
        />
      )}

      {status === 'COMPLETED' && (
        <Button
          label="모집 완료"
          aria-label="모집 완료 버튼"
          variant="filled"
          disabled
        />
      )}
    </>
  );
};
