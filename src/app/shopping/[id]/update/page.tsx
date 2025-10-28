import { UpdateShoppingForm } from '../../components/UpdateShoppingForm';
import { MeetingDetailType } from '@/types/meetingsType';

async function getMeetingDetail({
  id,
}: {
  id: string;
}): Promise<MeetingDetailType | null> {
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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('장보기 모임 상세 데이터 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('장보기 모임 상세 데이터 조회 실패', error);
    return null;
  }
}

export default async function UpdateShoppingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingDetail = await getMeetingDetail({ id });

  if (!meetingDetail) {
    return (
      <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-text-sub2">
            모임 데이터를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return <UpdateShoppingForm meetingDetail={meetingDetail} meetingId={id} />;
}
