import { Carousel } from '@/components/Atoms';
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
  const meetingId = (await params).id;

  if (Number.isNaN(Number(meetingId))) {
    notFound();
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}`,
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

    const title = `${meetingDetail.title} - 같이 소분하기`;
    const description =
      meetingDetail.description.slice(0, 160) ||
      '구매한 대용량 제품을 함께 나눌 사람을 찾아보세요';
    const meetingUrl = `/dividing/${meetingId}`;

    const ogImage =
      meetingDetail.images && meetingDetail.images.length > 0
        ? meetingDetail.images[0]
        : '/images/intro_people1.png';

    return {
      title,
      description,
      keywords: [
        '소분',
        '같이 소분하기',
        meetingDetail.title,
        meetingDetail.location_dep0,
        meetingDetail.location_dep1,
        meetingDetail.location_dep2,
        '같이 소분하기',
        '소분소분',
        '대용량 소분',
        '1인 가구 소분',
        '알뜰 소비',
      ],
      openGraph: {
        title,
        description,
        url: meetingUrl,
        type: 'article',
        publishedTime: meetingDetail.createdAt,
        authors: [meetingDetail.user.userName],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: meetingDetail.title,
          },
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
      title: '같이 소분하기 - 소분소분',
      description: '구매한 대용량 제품을 함께 나눌 사람을 찾아보세요',
    };
  }
}

export default async function DividingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sortType: 'RECENT' | 'OLDEST' }>;
}) {
  const meetingId = (await params).id;
  const sortType = (await searchParams).sortType || 'OLDEST';

  if (Number.isNaN(Number(meetingId))) {
    notFound();
  }

  const meetingDetail = await getMeetingDetail({ id: meetingId });

  if (!meetingDetail) {
    notFound();
  }

  const userInfo = await getUserInfo();
  const isAuthor = meetingDetail?.user.userId === userInfo?.id;
  const commentsList = await getComments({ id: meetingId, sortType });
  const participants = isAuthor
    ? await getParticipants({ meetingId: meetingId })
    : [];

  return (
    <section>
      <DetailHeader />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="w-full lg:sticky lg:top-6 lg:order-2 lg:w-[300px] xl:w-[350px]">
          <DynamicDetailAsideWrapper
            meetingDetail={meetingDetail!}
            isAuthor={isAuthor}
            participants={participants || []}
          />
        </div>

        <article className="flex-1 lg:order-1">
          <Carousel carouselImages={meetingDetail!.images} className="mb-8" />
          <DetailContent description={meetingDetail!.description} />

          {/* 댓글 영역 */}
          <DynamicCommentSectionWrapper
            commentsList={commentsList}
            status={meetingDetail!.status}
            isAuthor={isAuthor}
          />
        </article>
      </div>
    </section>
  );
}
