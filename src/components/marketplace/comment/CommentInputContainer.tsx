'use client';

import { TextInput } from '@/components';
import { Button } from '@/components';
import { useParams, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/Atoms';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentApi } from '@/apis/comment/createComment';

export const CommentInputContainer = ({
  status,
}: {
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
}) => {
  const meetingId = useParams<{ id: string }>().id;
  const { success, error } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const { mutate: createComment } = useMutation({
    mutationFn: (data: {
      meetingId: string;
      content: string;
      secret: boolean;
    }) => createCommentApi(data),
    onSuccess: (data) => {
      const sortType = searchParams.get('sortType');

      success(data.message);
      queryClient.invalidateQueries({
        queryKey: ['commentList', meetingId, sortType || 'OLDEST'],
      });
    },
    onError: (err: Error) => {
      error(err.message || '댓글 작성에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const meetingId = formData.get('meetingId') as string;
    const content = formData.get('comment') as string;
    const secret = Boolean(formData.get('secret'));
    createComment({ meetingId, content, secret });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input name="meetingId" hidden readOnly value={meetingId} />
        <div className="relative flex-1">
          <TextInput
            placeholder={
              status === 'COMPLETED' || status === 'CLOSED'
                ? '모집이 종료된 모임입니다.'
                : '댓글을 입력해주세요.'
            }
            name="comment"
            className="!border-text-line1 !border bg-white pr-[90px]"
            disabled={status === 'COMPLETED' || status === 'CLOSED'}
          />
          <div className="absolute top-1/2 right-3 flex translate-y-[-50%] items-center gap-1 select-none">
            <input type="checkbox" id="secret" name="secret" />
            <label
              htmlFor="secret"
              className="text-gray-60 cursor-pointer text-sm"
            >
              비공개
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
