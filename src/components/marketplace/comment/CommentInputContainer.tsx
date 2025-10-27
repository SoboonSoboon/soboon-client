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
  const { success, error } = useToast();

  useEffect(() => {
    if (state) {
      // 성공 메시지인지 에러 메시지인지 판단
      if (typeof state === 'string' && state.includes('작성')) {
        success(state);
      } else if (typeof state === 'string') {
        // 에러 메시지
        error(state);
      } else if (state === null) {
        // 서버 에러
        error('댓글 작성에 실패했습니다.');
      }
    }
  }, [state]);

  return (
    <div className="mb-6">
      <form action={formAction} className="flex items-center gap-2">
        <input name="meetingId" hidden readOnly value={meetingId} />
        <div className="relative flex-1">
          <TextInput
            placeholder={
              status === 'COMPLETED' || status === 'CLOSED'
                ? '모집이 종료된 모임입니다.'
                : '댓글을 입력해주세요.'
            }
            name="comment"
            className="!border-text-line1 !border-1 bg-white pr-[90px]"
            disabled={status === 'COMPLETED' || status === 'CLOSED'}
          />
          <div className="absolute top-1/2 right-3 flex translate-y-[-50%] items-center gap-1 select-none">
            <input type="checkbox" id="secret" name="secret" />
            <label
              htmlFor="secret"
              className="text-gray-60 cursor-pointer text-sm"
            >
              비밀 댓글
            </label>
          </div>
        </div>
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
