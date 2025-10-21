import { axiosInstance } from '../axiosInstance';

export type UserApplayStatusType = {
  meetingId: number;
  participationStatus: 'APPROVED' | 'APPLIED' | 'REJECTED' | 'CANCELLED';
};

export const getUserApplayStatus = async (): Promise<
  UserApplayStatusType[]
> => {
  const response = await axiosInstance.get(`/v1/me/meetings/applications`);
  return response.data.data;
};

export const cancelApplyMeeting = async ({
  id: meetingId,
}: {
  id: string;
}): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(
    `/v1/meetings/${meetingId}/applications`,
  );
  return response.data.message;
};
