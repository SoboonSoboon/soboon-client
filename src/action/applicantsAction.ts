'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const approveApplicants = async (
  _: unknown,
  applicationId: number,
  meetingId: string,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications/${applicationId}/approve`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications/${applicationId}/kick`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications/${applicationId}/reject`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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

// 참여신청 서버 액션
export const applyMeeting = async (_: unknown, meetingId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '참여신청 실패');
  }

  revalidateTag(`participants-${meetingId}`);

  const responseData = await response.json();

  return responseData;
};

export const applycancel = async (_: unknown, meetingId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applications`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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

export const handleCloseMeeting = async (meetingId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/complete`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('모임 마감 실패');
  }
  const responseData = await response.json();
  revalidateTag(`meeting-${meetingId}`);
  return responseData;
};
