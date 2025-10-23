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
  id: Number(process.env.NEXT_PUBLIC_DUMMY_USER_ID),
  name: '테스트유저5',
  nickname: null,
  image: 'https://example.com/profile5.jpg',
  province: '부산광역시',
  city: '해운대구',
  district: '우동',
  detail: '901-23',
};

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

  // 작성자 여부 판단 로직
  // 추후 실제 사용자 데이터로 변경 필요
  const isAuthor = shoppingMettingDetail?.user.userId === dummyUser.id;

  const participants = isAuthor ? await getParticipants({ meetingId: id }) : [];

  return (
    <section>
      <DetailHeader />
      <div className="flex gap-10">
        <article className="w-[730px]">
          <DetailContent description={shoppingMettingDetail!.description} />
          <DetailContentFooter createdAt={shoppingMettingDetail!.createdAt} />

          {/* 댓글 영역 */}
          <CommentSection
            commentsList={commentsList}
            status={shoppingMettingDetail!.status}
          />
        </article>

        <div className="sticky top-6 h-[95vh]">
          <DetailAside
            meetingDetail={shoppingMettingDetail!}
            isAuthor={isAuthor}
            participants={participants || []}
          />
        </div>
      </div>
    </section>
  );
}
