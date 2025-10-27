import { Carousel } from '@/components/Atoms/Carousel/Carousel';
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

const dummyUser = {
  id: Number(process.env.NEXT_PUBLIC_DUMMY_USER_ID),
  name: '테스트유저5',
  nickname: null,
  image: 'https://example.com/profile5.jpg',
  province: '부산광역시',
  city: '해운대구',
  district: '우동',
  detail: '901-23',
};

// 소분하기 모임 상세 데이터 조회
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
}: {
  id: string;
}): Promise<CommentsListType | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${id}/comments`,
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
export default async function SharingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // 소분하기 모임 상세 데이터 조회
  const meetingDetail = await getMeetingDetail({
    id,
  });

  // 댓글 조회
  const commentsList = await getComments({ id });

  const isAuthor = meetingDetail?.user.userId === dummyUser.id;

  const participants = isAuthor ? await getParticipants({ meetingId: id }) : [];

  return (
    <section>
      <DetailHeader />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="w-full lg:sticky lg:top-6 lg:order-2 lg:w-[300px] xl:w-[350px]">
          <DetailAside
            meetingDetail={meetingDetail!}
            isAuthor={isAuthor}
            participants={participants || []}
          />
        </div>

        <article className="flex-1 lg:order-1">
          {/* 추후에 DB에 실제 이미지가 추가되면 연동 필요 */}
          <Carousel carouselImages={meetingDetail!.images} className="mb-8" />
          <DetailContent description={meetingDetail!.description} />
          <DetailContentFooter createdAt={meetingDetail!.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection
            commentsList={commentsList}
            status={meetingDetail!.status}
          />
        </article>
      </div>
    </section>
  );
}
