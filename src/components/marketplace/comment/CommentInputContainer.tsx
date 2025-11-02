'use client';

import { Button, TextInput, useToast } from '@/components/Atoms';
import { useParams, useSearchParams } from 'next/navigation';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentApi } from '@/apis/comment/createComment';
import { useAuthStore } from '@/apis/auth/hooks/authStore';

export const CommentInputContainer = ({
  status,
}: {
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
}) => {
  const meetingId = useParams<{ id: string }>().id;
  const { success, error } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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
      queryClient.invalidateQueries({
        queryKey: ['commentCount', meetingId],
      });
    },
    onError: (err: Error) => {
      error(err.message || '댓글 작성에 실패했어요.');
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
                : !isLoggedIn
                  ? '로그인이 필요합니다.'
                  : '댓글을 입력해 주세요.'
            }
            name="comment"
            className="!border-text-line1 !border bg-white pr-[90px]"
            disabled={
              status === 'COMPLETED' || status === 'CLOSED' || !isLoggedIn
            }
          />
          {isLoggedIn && (
            <div className="absolute top-1/2 right-4 flex translate-y-[-50%] items-center gap-1 select-none">
              <input type="checkbox" id="secret" name="secret" />
              <label
                htmlFor="secret"
                className="text-gray-60 cursor-pointer text-sm"
              >
                비공개
              </label>
            </div>
          )}
        </div>
        <Button
          label="작성"
          type="submit"
          variant="outline"
          className={cn(
            'w-20 shrink',
            status === 'COMPLETED' || status === 'CLOSED' || !isLoggedIn
              ? 'border-text-line2 text-text-line2 !cursor-not-allowed'
              : 'border-primary text-primary',
          )}
          disabled={
            status === 'COMPLETED' || status === 'CLOSED' || !isLoggedIn
          }
        />
      </form>
    </div>
  );
};
