import { DetailHeader, DetailContent } from '@/components/marketplace';
import { MeetingDetailType } from '@/types/meetingsType';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DynamicDetailAsideWrapper } from '@/components/marketplace/wrapper/DynamicDetailAsideWrapper';
import { DynamicCommentSectionWrapper } from '@/components/marketplace/wrapper/DynamicCommentSectionWrapper';
import {
  getUserInfo,
  getMeetingDetail,
  getComments,
  getParticipants,
} from '@/apis/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  if (Number.isNaN(Number(id))) {
    notFound();
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch meeting detail');
    }

    const responseData = await response.json();
    const meetingDetail: MeetingDetailType = responseData.data;

    const title = `${meetingDetail.title} - 같이 장보기`;
    const description =
      meetingDetail.description.slice(0, 160) ||
      '대용량 제품을 함께 구매하는 공동구매 모임';
    const meetingUrl = `/shopping/${id}`;

    const ogImage = '/images/intro_people1.png';

    return {
      title,
      description,
      keywords: [
        '공동구매',
        meetingDetail.title,
        meetingDetail.location_dep0,
        meetingDetail.location_dep1,
        meetingDetail.location_dep2,
        '같이 장보기',
        '소분소분',
        '대용량 구매',
      ],
      openGraph: {
        title,
        description,
        url: meetingUrl,
        type: 'article',
        publishedTime: meetingDetail.createdAt,
        authors: [meetingDetail.user.userName],
        images: [
          { url: ogImage, width: 1200, height: 630, alt: meetingDetail.title },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: meetingUrl,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata', error);
    return {
      title: '같이 장보기 - 소분소분',
      description: '대용량 제품을 함께 구매할 사람을 찾아보세요',
    };
  }
}

export default async function ShoppingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sortType: 'RECENT' | 'OLDEST' }>;
}) {
  const id = (await params).id;
  const sortType = (await searchParams).sortType;
  const userInfo = await getUserInfo();

  if (Number.isNaN(Number(id))) {
    notFound();
  }

  const shoppingMeetingDetail = await getMeetingDetail({ id });

  if (!shoppingMeetingDetail) {
    notFound();
  }

  const isAuthor = shoppingMeetingDetail?.user.userId === userInfo?.id;

  const commentsList = await getComments({ id, sortType });

  const participants = isAuthor ? await getParticipants({ meetingId: id }) : [];

  return (
    <section>
      <DetailHeader />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="w-full lg:sticky lg:top-6 lg:order-2 lg:w-[350px] xl:w-[430px]">
          <DynamicDetailAsideWrapper
            meetingDetail={shoppingMeetingDetail!}
            isAuthor={isAuthor}
            participants={participants || []}
          />
        </div>

        <article className="flex-1 lg:order-1">
          <DetailContent description={shoppingMeetingDetail!.description} />

          {/* 댓글 영역 */}
          <DynamicCommentSectionWrapper
            commentsList={commentsList}
            status={shoppingMeetingDetail!.status}
            isAuthor={isAuthor}
          />
        </article>
      </div>
    </section>
  );
}
