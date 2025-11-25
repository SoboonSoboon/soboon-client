import { cookies } from 'next/headers';
import { MeetingDetailType } from '@/types/meetingsType';
import { CommentsListType } from '@/types/commentType';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { UserInfoType } from '@/types/authType';

const API_URL = process.env.NEXT_PUBLIC_SOBOON_API_URL;

// 서버에서 accessToken 가져오기
export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || '';
}

// 사용자 정보 조회
export async function getUserInfo(): Promise<UserInfoType | null> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/v1/auth/me`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('사용자 정보 조회 실패');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('사용자 정보 조회 실패', error);
    return null;
  }
}

// 모임 상세 데이터 조회
export async function getMeetingDetail({
  id,
}: {
  id: string;
}): Promise<MeetingDetailType | null> {
  try {
    const response = await fetch(`${API_URL}/v1/meetings/${id}`, {
      cache: 'no-store',
      next: {
        tags: [`meeting-${id}`],
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('모임 상세 데이터 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('모임 상세 데이터 조회 실패', error);
    return null;
  }
}

// 댓글 조회
export async function getComments({
  id,
  sortType = 'OLDEST',
}: {
  id: string;
  sortType?: 'RECENT' | 'OLDEST';
}): Promise<CommentsListType | null> {
  try {
    const response = await fetch(
      `${API_URL}/v1/meetings/${id}/comments?page=0&size=10&sort=${sortType}`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 30,
          tags: [`comments-${id}`],
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('댓글 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('댓글 조회 실패', error);
    return null;
  }
}

// 참여 신청자 목록 조회
export async function getParticipants({
  meetingId,
}: {
  meetingId: string;
}): Promise<ApplicantsMemberType['data'][]> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_URL}/v1/meetings/${meetingId}/applicants`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 10,
          tags: [`participants-${meetingId}`],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('참여 신청자 목록 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('참여 신청자 목록 조회 실패', error);
    return [];
  }
}
