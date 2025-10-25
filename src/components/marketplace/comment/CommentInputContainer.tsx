'use client';

import { TextInput } from '@/components';
import { Button } from '@/components';
import { createComment } from '@/action/commentAction';
import { useActionState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/Atoms';
import { cn } from '@/utils/cn';

export const CommentInputContainer = ({
  status,
}: {
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
}) => {
  const meetingId = useParams<{ id: string }>().id;
  const [state, formAction] = useActionState(createComment, null);
  const { success } = useToast();
  useEffect(() => {
    if (state) {
      success(state);
    }
  }, [state]);

  return (
    <div className="mb-6">
      <form action={formAction} className="flex items-center gap-2">
        <input name="meetingId" hidden readOnly value={meetingId} />
        <TextInput
          placeholder={
            status === 'COMPLETED' || status === 'CLOSED'
              ? '모집이 종료된 모임입니다.'
              : '댓글을 입력해주세요.'
          }
          name="comment"
          className="!border-text-line1 !border-1 bg-white"
          disabled={status === 'COMPLETED' || status === 'CLOSED'}
        />
        <Button
          label="작성"
          type="submit"
          variant="outline"
          className={cn(
            'w-20 shrink',
            status === 'COMPLETED' || status === 'CLOSED'
              ? 'border-text-line2 text-text-line2 !cursor-not-allowed'
              : 'border-primary text-primary',
          )}
          disabled={status === 'COMPLETED' || status === 'CLOSED'}
        />
      </form>
    </div>
  );
};
