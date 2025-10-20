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
import { ApplicantsMemberType } from '@/types/applicantsType';

const dummyUser = {
  id: 35,
  name: '테스트유저5',
  nickname: null,
  image: 'https://example.com/profile5.jpg',
  province: '부산광역시',
  city: '해운대구',
  district: '우동',
  detail: '901-23',
};

// 소분하기 모임 상세 데이터 조회
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

// 참여 신청자 목록 조회
async function getParticipants({
  meetingId,
}: {
  meetingId: string;
}): Promise<ApplicantsMemberType['data'][]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/applicants`,
      {
        cache: 'no-store',
        next: {
          tags: [`participants-${meetingId}`],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
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
  const meetingDetail = await getSharingMettingDetail({
    id,
  });

  // 댓글 조회
  const commentsList = await getComments({ id });

  const isAuthor = 35 === dummyUser.id;

  const participants = isAuthor ? await getParticipants({ meetingId: id }) : [];

  return (
    <section>
      <DetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          {/* 추후에 DB에 실제 이미지가 추가되면 연동 필요 */}
          <Carousel carouselImages={meetingDetail!.images} className="mb-8" />
          <DetailContent description={meetingDetail!.description} />
          <DetailContentFooter createdAt={meetingDetail!.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection commentsList={commentsList} />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <DetailAside
            title={meetingDetail!.item}
            detail_address={meetingDetail!.detail_address}
            current_member={meetingDetail!.current_member}
            total_member={meetingDetail!.total_member}
            status={meetingDetail!.status}
            isAuthor={isAuthor}
            participants={participants || []}
          />
        </div>
      </div>
    </section>
  );
}
