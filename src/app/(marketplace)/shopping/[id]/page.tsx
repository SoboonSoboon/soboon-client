import { Carousel } from '@/components/Atoms/Carousel/Carousel';
import {
  DetailHeader,
  DetailContent,
  DetailContentFooter,
  CommentSection,
  DetailAside,
} from '@/app/(marketplace)/components';
import { MeetingDetailType } from '@/types/meetingsType';
import { CommentsListType } from '@/types/commentType';

const carouselImages = [
  'https://www.dummyimage.com/700x600/FF6B6B/fff',
  'https://www.dummyimage.com/700x600/FFA500/fff',
  'https://www.dummyimage.com/700x600/FFFF00/fff',
  'https://www.dummyimage.com/700x600/00FF00/fff',
  'https://www.dummyimage.com/700x600/0000FF/fff',
];

async function getMettingDetail({
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

// 댓글 조회
async function getComments({
  id,
}: {
  id: string;
}): Promise<CommentsListType | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}/comments`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
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

export default async function ShoppingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const shoppingMettingDetail = await getMettingDetail({
    id,
  });

  // 댓글 조회
  const commentsList = await getComments({ id });

  return (
    <section>
      <DetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          <Carousel carouselImages={carouselImages} className="mb-8" />
          <DetailContent description={shoppingMettingDetail!.description} />
          <DetailContentFooter createdAt={shoppingMettingDetail!.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection commentsList={commentsList} />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <DetailAside
            title={shoppingMettingDetail!.title}
            detail_address={shoppingMettingDetail!.detail_address}
            current_member={shoppingMettingDetail!.current_member}
            total_member={shoppingMettingDetail!.total_member}
            status={shoppingMettingDetail!.status}
          />
        </div>
      </div>
    </section>
  );
}
