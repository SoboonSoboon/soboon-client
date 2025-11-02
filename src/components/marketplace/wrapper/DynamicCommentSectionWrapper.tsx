'use client';

import dynamic from 'next/dynamic';
import { MeetingDetailType } from '@/types/meetingsType';
import { CommentsListType } from '@/types/commentType';

const DynamicCommentSection = dynamic(
  () =>
    import('@/components/marketplace/comment/CommentSection').then(
      (mod) => mod.CommentSection,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 animate-pulse space-y-4">
        <div className="h-10 rounded bg-gray-200"></div>
        <div className="h-32 rounded bg-gray-200"></div>
      </div>
    ),
  },
);

interface DynamicCommentSectionWrapperProps {
  commentsList: CommentsListType | null;
  status: MeetingDetailType['status'];
  isAuthor: boolean;
}

export function DynamicCommentSectionWrapper({
  commentsList,
  status,
  isAuthor,
}: DynamicCommentSectionWrapperProps) {
  return (
    <DynamicCommentSection
      commentsList={commentsList}
      status={status}
      isAuthor={isAuthor}
    />
  );
}
