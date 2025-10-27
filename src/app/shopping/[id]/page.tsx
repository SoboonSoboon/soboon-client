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

async function getUserInfo(): Promise<UserInfoType | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
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

async function getMeetingDetail({
  id,
}: {
  id: string;
}): Promise<MeetingDetailType | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}/comments?sort=${sortType}`,
      {
        cache: 'force-cache',
        next: {
          revalidate: 30,
          tags: [`comments-${id}`],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response);
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
        <div className="w-full lg:sticky lg:top-6 lg:order-2 lg:w-[300px] xl:w-[350px]">
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
