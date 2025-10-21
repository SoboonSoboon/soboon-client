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
          className="w-full text-white"
          backgroundColor="#ff4805"
          onClick={() => handleCloseMeetingAction()}
        />
      )}

      {status === 'COMPLETED' && (
        <Button
          label="모집 완료"
          className="text-text-sub2 w-full !cursor-not-allowed"
          backgroundColor="#f5f5f5"
          disabled
        />
      )}
    </>
  );
};
