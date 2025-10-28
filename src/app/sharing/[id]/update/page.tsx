import { UpdateDividingForm } from '../../components/UpdateDividingForm';
import { cookies } from 'next/headers';

async function getMeetingDetail({ id }: { id: string }) {
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
      throw new Error('소분하기 모임 상세 데이터 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('소분하기 모임 상세 데이터 조회 실패', error);
    throw error;
  }
}

export default async function UpdateDividingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const meetingDetail = await getMeetingDetail({ id });

    if (!meetingDetail) {
      return (
        <div className="mx-auto w-full max-w-[760px]">
          <div className="flex items-center justify-center py-8">
            <div className="text-text-sub2">
              모임 데이터를 불러올 수 없습니다. 다시 시도해 주세요.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-[760px]">
        <div className="border-gray-10 flex flex-col gap-6 rounded-xl border bg-white p-4 sm:gap-8 sm:p-6 lg:gap-10">
          <span className="text-2xl font-bold sm:text-2xl">
            <strong className="text-primary">소분 </strong>
            모임 수정하기
          </span>
          <UpdateDividingForm meetingDetail={meetingDetail} meetingId={id} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('페이지 로드 실패:', error);

    return (
      <div className="mx-auto w-full max-w-[760px]">
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
