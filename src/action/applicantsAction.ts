'use server';

import { revalidateTag } from 'next/cache';

export const approveApplicants = async (
  _: unknown,
  applicationId: number,
  meetingId: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications/${applicationId}/approve`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('모임 신청 수락 실패');
  }

  revalidateTag(`participants-${meetingId}`);

  const responseData = await response.json();

  return responseData;
};

export const kickApplicants = async (
  _: unknown,
  applicationId: number,
  meetingId: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications/${applicationId}/kick`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('참여자 강퇴 실패');
  }

  revalidateTag(`participants-${meetingId}`);

  const responseData = await response.json();

  return responseData;
};

export const rejectApplicants = async (
  _: unknown,
  applicationId: number,
  meetingId: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications/${applicationId}/reject`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('참여자 거절 실패');
  }

  revalidateTag(`participants-${meetingId}`);

  const responseData = await response.json();

  return responseData;
};
