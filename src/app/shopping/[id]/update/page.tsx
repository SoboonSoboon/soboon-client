import { UpdateShoppingForm } from '../../components/UpdateShoppingForm';
import { MeetingDetailType } from '@/types/meetingsType';
import { cookies } from 'next/headers';

async function getMeetingDetail({
  id,
}: {
  id: string;
}): Promise<MeetingDetailType | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';

  if (!accessToken) {
    throw new Error('인증이 필요합니다. 다시 시도해 주세요.');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}`,
      {
        cache: 'no-store',
        next: {
          tags: [`meeting-${id}`],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('접근 권한이 없습니다. 다시 시도해 주세요.');
      }
      throw new Error('장보기 모임 상세 데이터 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('장보기 모임 상세 데이터 조회 실패', error);
    throw error;
  }
}

export default async function UpdateShoppingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const meetingDetail = await getMeetingDetail({ id });

    if (!meetingDetail) {
      return (
        <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-text-sub2">
              모임 데이터를 불러올 수 없습니다. 다시 시도해 주세요.
            </div>
          </div>
        </div>
      );
    }

    return <UpdateShoppingForm meetingDetail={meetingDetail} meetingId={id} />;
  } catch (error) {
    console.error('페이지 로드 실패:', error);

    return (
      <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-text-sub2">
            {error instanceof Error
              ? error.message
              : '페이지를 불러올 수 없습니다. 다시 시도해 주세요.'}
          </div>
        </div>
      </div>
    );
  }
}
