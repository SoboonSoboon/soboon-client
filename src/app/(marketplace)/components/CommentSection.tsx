'use client';

import { CommentsType } from '@/types/commentType';
import { CommentCountContainer } from './comment/CommentCountContainer';
import { CommentInputContainer } from './comment/CommentInputContainer';
import { CommentListContainer } from './comment/CommentListContainer';
import { useEffect, useState } from 'react';

// 더미 데이터
const dummyComments: CommentsType['content'] = [
  {
    commentId: 1,
    authorId: 1,
    authorNickname: '빵빵이',
    authorProfileImageUrl: '/images/dummy_profile.png',
    content: '좋은 모임이네요!',
    secret: false,
    createdAt: '2025-10-06T00:00:00',
    replies: [
      {
        replyId: 2,
        authorId: 2,
        authorNickname: '소분왕',
        authorProfileImageUrl: '/images/dummy_profile.png',
        content: '동의합니다!',
        secret: false,
        createdAt: '2025-10-06T01:00:00',
      },
    ],
  },
  {
    commentId: 3,
    authorId: 3,
    authorNickname: '친환경러버',
    authorProfileImageUrl: '/images/dummy_profile.png',
    content: '저도 참여하고 싶어요! 언제까지 신청 가능한가요?',
    secret: false,
    createdAt: '2025-10-06T02:00:00',
    replies: [],
  },
  {
    commentId: 4,
    authorId: 4,
    authorNickname: '소분마스터',
    authorProfileImageUrl: '/images/dummy_profile.png',
    content: '이런 모임 정말 좋네요. 다음에도 참여하고 싶어요!',
    secret: false,
    createdAt: '2025-10-06T03:00:00',
    replies: [
      {
        replyId: 5,
        authorId: 1,
        authorNickname: '빵빵이',
        authorProfileImageUrl: '/images/dummy_profile.png',
        content: '감사합니다! 다음에도 좋은 모임 만들어보겠습니다.',
        secret: false,
        createdAt: '2025-10-06T04:00:00',
      },
      {
        replyId: 6,
        authorId: 5,
        authorNickname: '에코프렌드',
        authorProfileImageUrl: '/images/dummy_profile.png',
        content: '저도 동감해요!',
        secret: false,
        createdAt: '2025-10-06T05:00:00',
      },
    ],
  },
  {
    commentId: 7,
    authorId: 6,
    authorNickname: '지구지킴이',
    authorProfileImageUrl: '/images/dummy_profile.png',
    content: '환경을 생각하는 모임이네요. 응원합니다!',
    secret: false,
    createdAt: '2025-10-06T06:00:00',
    replies: [],
  },
];

export const CommentSection = ({
  commentsList,
}: {
  commentsList: CommentsType | null;
}) => {
  const [comments, setComments] = useState<CommentsType['content']>(
    commentsList?.content || [],
  );

  useEffect(() => {
    setComments(commentsList?.content || []);
  }, [commentsList]);

  return (
    <div className="mt-8 w-full">
      {/* 댓글 헤더 */}
      <CommentCountContainer commentCount={dummyComments.length} />

      {/* 댓글 입력 영역 */}
      <CommentInputContainer />

      {/* 댓글 리스트 영역 */}
      <CommentListContainer commentList={comments} />
    </div>
  );
};
