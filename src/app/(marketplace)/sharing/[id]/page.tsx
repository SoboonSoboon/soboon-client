import { Carousel } from '@/components/Atoms/Carousel/Carousel';
import {
  DetailHeader,
  DetailContent,
  DetailContentFooter,
  CommentSection,
  DetailAside,
} from '@/app/(marketplace)/components';
import { MeetingDetailType } from '@/types/meetingsType';

const carouselImages = [
  'https://www.dummyimage.com/700x600/FF6B6B/fff',
  'https://www.dummyimage.com/700x600/FFA500/fff',
  'https://www.dummyimage.com/700x600/FFFF00/fff',
  'https://www.dummyimage.com/700x600/00FF00/fff',
  'https://www.dummyimage.com/700x600/0000FF/fff',
];

async function getSharingMettingDetail({
  id,
}: {
  id: string;
}): Promise<MeetingDetailType | null> {
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

export default async function SharingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const meetingDetail = await getSharingMettingDetail({
    id: (await params).id,
  });
  console.log(meetingDetail);
  return (
    <section>
      <DetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          {/* 추후에 DB에 실제 이미지가 추가되면 연동 필요 */}
          <Carousel carouselImages={carouselImages} className="mb-8" />
          <DetailContent description={meetingDetail!.description} />
          <DetailContentFooter createdAt={meetingDetail!.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <DetailAside
            title={meetingDetail!.title}
            detail_address={meetingDetail!.detail_address}
            current_member={meetingDetail!.current_member}
            total_member={meetingDetail!.total_member}
          />
        </div>
      </div>
    </section>
  );
}
