'use client';

import { UserApplayStatusType } from '@/apis/meetings/userApplayStatusApi';
import { Button } from '@/components';

export const ApplyStatusButtonSection = ({
  filteredStatus,
  handleApplyMeeting,
  handleCancelApplyMeeting,
  meetingId,
}: {
  filteredStatus: UserApplayStatusType | null | undefined;
  handleApplyMeeting: (meetingId: string) => void;
  handleCancelApplyMeeting: (meetingId: string) => void;
  meetingId: string;
}) => {
  return (
    <>
      <div className="mb-5">
        {/* 신청을 취소했을 때 나타나는 버튼 */}
        {(!filteredStatus?.participationStatus ||
          filteredStatus?.participationStatus === 'CANCELLED') && (
          <Button
            label="모임 신청"
            className="w-full"
            variant="filled"
            onClick={() => handleApplyMeeting(meetingId)}
          />
        )}

        {/* 신청을 하지 않았을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'APPLIED' && (
          <Button
            className="h-15 w-full !bg-[var(--GrayScale-Gray80)]"
            variant="filled"
            onClick={() => handleCancelApplyMeeting(meetingId)}
          >
            <div>
              <p className="text-base">모임이 신청되었어요.</p>
              <p className="text-xs">다시 클릭하면 취소할 수 있어요.</p>
            </div>
          </Button>
        )}

        {/* 신청이 승인되었을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'APPROVED' && (
          <Button
            label="모임 신청이 승인되었어요."
            className="w-full"
            variant="filled"
            disabled
          />
        )}

        {/* 신청이 거절되었을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'REJECTED' && (
          <Button
            label="모임 신청이 거절되었어요."
            variant="filled"
            className="w-full"
            disabled
          />
        )}

        {/* 신청자가 강퇴되었을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'KICKED' && (
          <Button
            label="모임에서 강퇴되었어요."
            variant="filled"
            className="w-full"
            disabled
          />
        )}
      </div>
    </>
  );
};
