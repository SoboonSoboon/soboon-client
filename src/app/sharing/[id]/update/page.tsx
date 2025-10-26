import { UpdateDividingForm } from '../../components/UpdateDividingForm';

async function getMeetingDetail({ id }: { id: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('소분하기 모임 상세 데이터 조회 실패');
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error('소분하기 모임 상세 데이터 조회 실패', error);
    return null;
  }
}

export default async function UpdateDividingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 기존 데이터 조회
  const meetingDetail = await getMeetingDetail({ id });

  if (!meetingDetail) {
    return (
      <div className="mx-auto w-full max-w-[760px] px-4 sm:mt-6 sm:px-6 lg:mt-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-text-sub2">
            모임 데이터를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 sm:mt-6 sm:px-6 lg:mt-6">
      <div className="border-gray-10 flex flex-col gap-6 rounded-xl border bg-white p-4 sm:gap-8 sm:p-6 lg:gap-10">
        <span className="text-2xl font-bold sm:text-2xl">
          <strong className="text-primary">소분 </strong>
          모임 수정하기
        </span>
        <UpdateDividingForm meetingDetail={meetingDetail} meetingId={id} />
      </div>
    </div>
  );
}
