'use client';

import { TextInput } from '@/components';
import { Button } from '@/components';
import { createComment } from '@/action/commentAction';
import { useActionState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/Atoms';

export const CommentInputContainer = () => {
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
          placeholder="댓글을 입력해주세요."
          name="comment"
          className="!border-text-line1 !border-1 bg-white"
        />
        <Button
          label="작성"
          type="submit"
          className="border-primary text-primary w-20 shrink-0"
        />
      </form>
    </div>
  );
};
