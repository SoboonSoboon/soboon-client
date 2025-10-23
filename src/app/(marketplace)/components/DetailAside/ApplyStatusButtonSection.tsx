'use client';

import { UserApplyStatusType } from '@/apis/meetings/userApplyStatusApi';
import { Button } from '@/components';

export const ApplyStatusButtonSection = ({
  filteredStatus,
  handleApplyMeeting,
  handleCancelApplyMeeting,
  meetingId,
}: {
  filteredStatus: UserApplyStatusType | null | undefined;
  handleApplyMeeting: (meetingId: string) => void;
  handleCancelApplyMeeting: (meetingId: string) => void;
  meetingId: string;
}) => {
  return (
    <>
      <div className="mb-5">
        {/* 모임 신청이 가능한 버튼 */}
        {(!filteredStatus?.participationStatus ||
          filteredStatus?.participationStatus === 'CANCELLED') && (
          <Button
            label="모임 신청"
            className="w-full"
            variant="filled"
            onClick={() => handleApplyMeeting(meetingId)}
          />
        )}

        {/* 모임 신청 후 취소가 가능한 버튼 */}
        {filteredStatus?.participationStatus === 'APPLIED' && (
          <Button
            className="w-full !bg-[var(--GrayScale-Gray80)]"
            variant="filled"
            onClick={() => handleCancelApplyMeeting(meetingId)}
            label="신청 취소"
          />
        )}

        {/* 신청이 승인되었을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'APPROVED' && (
          <Button
            label="모임 신청이 승인되었어요."
            className="w-full !bg-[var(--GrayScale-Gray30)]"
            variant="filled"
            disabled
          />
        )}

        {/* 신청이 거절되었을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'REJECTED' && (
          <Button
            label="모임 신청이 거절되었어요."
            variant="filled"
            className="w-full !bg-[var(--GrayScale-Gray30)]"
            disabled
          />
        )}

        {/* 신청자가 강퇴되었을 때 나타나는 버튼 */}
        {filteredStatus?.participationStatus === 'KICKED' && (
          <Button
            label="모임에서 강퇴되었어요."
            variant="filled"
            className="w-full !bg-[var(--GrayScale-Gray30)]"
            disabled
          />
        )}
      </div>
    </>
  );
};
