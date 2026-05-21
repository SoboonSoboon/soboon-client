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
import { CommentsListType } from '@/types/commentType';

// ─── [DEMO MODE] ────────────────────────────────────────────────────────────
// id === 'demo' 일 때 API를 모두 건너뛰고 아래 목 데이터를 사용합니다.
// 시연 영상 촬영 후 MOCK_MEETING_DETAIL / MOCK_COMMENTS_LIST 블록과
// demo 분기를 제거하세요.
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_MEETING_DETAIL: MeetingDetailType = {
  id: 9999,
  title: '유정란 90구 소분 모집',
  location_dep0: '서울특별시',
  location_dep1: '강남구',
  location_dep2: '역삼동',
  detail_address: '스타벅스앞',
  images: ['/images/intro_people1.png'],
  status: 'RECRUITING',
  location: {
    province: '서울특별시',
    city: '강남구',
    district: '역삼동',
    detail: '스타벅스앞',
  },
  description:
    '오늘 선물받은  유정란 90구를 함께 나눌 분을 모집합니다.\n이번 주 토요일 오후 2시 만남을 희망합니다.',
  current_member: 1,
  total_member: 3,
  category: 'DIVIDING',
  productTypes: ['FRESH'],
  tags: ['유정란', '동물복지', '강남구'],
  createdAt: new Date().toISOString(),
  bookmarked: false,
  user: {
    userId: 1,
    userName: '소분소분',
    profile: '',
  },
};

// [DEMO] CommentSection이 null!.totalElements를 호출해 크래시하는 것을 방지
// CommentCountContainer / CommentListContainer의 initialData로도 사용
const MOCK_COMMENTS_LIST: CommentsListType = {
  content: [],
  sliceInfo: { currentPage: 0, size: 10, hasNext: false },
  totalElements: 0,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const meetingId = (await params).id;

  // [DEMO] id가 'demo'이면 목 메타데이터 반환
  if (meetingId === 'demo') {
    return {
      title: `${MOCK_MEETING_DETAIL.title} - 같이 소분하기`,
      description: MOCK_MEETING_DETAIL.description.slice(0, 160),
    };
  }

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

  // [DEMO] id가 'demo'이면 API 전체 건너뛰고 목 데이터로 렌더링
  if (meetingId === 'demo') {
    return (
      <section>
        <DetailHeader />
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="w-full lg:sticky lg:top-6 lg:order-2 lg:w-[300px] xl:w-[350px]">
            <DynamicDetailAsideWrapper
              meetingDetail={MOCK_MEETING_DETAIL}
              isAuthor={true}
              participants={[]}
            />
          </div>
          <article className="flex-1 lg:order-1">
            <Carousel
              carouselImages={MOCK_MEETING_DETAIL.images}
              className="mb-8"
            />
            <DetailContent description={MOCK_MEETING_DETAIL.description} />
            <DynamicCommentSectionWrapper
              commentsList={MOCK_COMMENTS_LIST}
              status={MOCK_MEETING_DETAIL.status}
              isAuthor={true}
            />
          </article>
        </div>
      </section>
    );
  }

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
