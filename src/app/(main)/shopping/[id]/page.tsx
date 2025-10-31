import {
  DetailHeader,
  DetailContent,
  DetailContentFooter,
  CommentSection,
  DetailAside,
} from '@/components/marketplace';
import { MeetingDetailType } from '@/types/meetingsType';
import { CommentsListType } from '@/types/commentType';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { cookies } from 'next/headers';
import { UserInfoType } from '@/types/authType';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

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

async function getUserInfo(): Promise<UserInfoType | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  if (accessToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/auth/me`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
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
  return null;
}

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
  sortType = 'OLDEST',
}: {
  id: string;
  sortType?: 'RECENT' | 'OLDEST';
}): Promise<CommentsListType | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}/comments?page=0&size=10&sort=${sortType}`,
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
async function getParticipants({
  meetingId,
}: {
  meetingId: string;
}): Promise<ApplicantsMemberType['data'][]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  if (accessToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applicants`,
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
  return [];
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

  const shoppingMeetingDetail = await getMeetingDetail({ id });

  const isAuthor = shoppingMeetingDetail?.user.userId === userInfo?.id;

  const commentsList = await getComments({ id, sortType });

  const participants = isAuthor ? await getParticipants({ meetingId: id }) : [];

  return (
    <section>
      <DetailHeader />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="w-full lg:sticky lg:top-6 lg:order-2 lg:w-[350px] xl:w-[430px]">
          <DetailAside
            meetingDetail={shoppingMeetingDetail!}
            isAuthor={isAuthor}
            participants={participants || []}
          />
        </div>

        <article className="flex-1 lg:order-1">
          <DetailContent description={shoppingMeetingDetail!.description} />
          <DetailContentFooter createdAt={shoppingMeetingDetail!.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection
            commentsList={commentsList}
            status={shoppingMeetingDetail!.status}
            isAuthor={isAuthor}
          />
        </article>
      </div>
    </section>
  );
}
