'use client';

import { CommentsType, ReplyType } from '@/types/commentType';
import { CommentItem } from './CommentItem';
import { useActionState, useEffect, useState } from 'react';
import { Button, TextInput } from '@/components';
import { createReply } from '@/action/commentAction';
import { useParams, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/Atoms';
import { CornerDownRight } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommentApi } from '@/apis/comment/getComment';
import { useInfiniteScrollTrigger } from '@/hooks/useScroll';

export const CommentListContainer = ({
  initialCommentList,
  isAuthor,
}: {
  initialCommentList: CommentsType['content'];
  isAuthor: boolean;
}) => {
  const [openReply, setOpenReply] = useState<number | null>(null);
  const meetingId = useParams<{ id: string }>().id;
  const searchParams = useSearchParams();
  const sortType = searchParams.get('sortType');
  const { success, error } = useToast();
  const [state, formAction] = useActionState(createReply, null);

  const { isBottom } = useInfiniteScrollTrigger();

  const handleToggleReply = (commentId: number) => {
    setOpenReply(commentId);
  };
  const handleCloseReply = () => {
    setOpenReply(null);
  };

  useEffect(() => {
    if (state) {
      // 성공 메시지인지 에러 메시지인지 판단
      if (typeof state === 'string' && state.includes('작성')) {
        success(state);
        handleCloseReply();
      } else if (typeof state === 'string') {
        // 에러 메시지
        error(state);
      } else if (state === null) {
        // 서버 에러
        error('댓글 작성에 실패했습니다.');
      }
    }
  }, [state]);

  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['commentList', meetingId, sortType],
    queryFn: async ({ pageParam }) => {
      const urlParams = new URLSearchParams();

      if (sortType) {
        urlParams.set('sort', sortType);
      } else {
        urlParams.set('sort', 'OLDEST');
      }

      urlParams.set('page', (pageParam as number).toString());

      const response = await getCommentApi(meetingId, urlParams);

      const responseData = response.data;

      return responseData;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.sliceInfo?.hasNext) {
        const nextPage = lastPage.sliceInfo.currentPage;
        return nextPage;
      }

      return undefined;
    },
    initialData: initialCommentList
      ? {
          pages: [initialCommentList],
          pageParams: [0],
        }
      : undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (isBottom && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage, isFetchingNextPage]);

  if (!commentList || !commentList.pages[0]?.content) {
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        {commentList.pages
          .flatMap((page) => page.content)
          .map((comment) => (
            <div
              key={comment.commentId}
              className="border-gray-10 border-b pb-6"
            >
              {/* 메인 댓글 */}
              <div>
                <div className="flex flex-col gap-2">
                  <CommentItem comment={comment} isAuthor={isAuthor} />
                  {!openReply && (
                    <div>
                      <span
                        className="text-primary cursor-pointer font-normal"
                        onClick={() => handleToggleReply(comment.commentId)}
                      >
                        답글
                      </span>
                    </div>
                  )}
                </div>
                {openReply === comment.commentId && (
                  <div className="mt-3">
                    <form
                      action={formAction}
                      className="flex items-center gap-2"
                    >
                      <input
                        name="meetingId"
                        hidden
                        readOnly
                        value={meetingId}
                      />
                      <input
                        name="commentId"
                        hidden
                        readOnly
                        value={comment.commentId}
                      />
                      <div className="relative flex-1">
                        <TextInput
                          placeholder="대댓글을 입력해주세요."
                          name="reply"
                          className="!border-text-line1 !border bg-white pr-[90px]"
                        />
                        <div className="absolute top-1/2 right-3 flex translate-y-[-50%] items-center gap-1 select-none">
                          <input
                            type="checkbox"
                            id="replySecret"
                            name="secret"
                          />
                          <label
                            htmlFor="replySecret"
                            className="text-gray-60 cursor-pointer text-sm"
                          >
                            비밀 댓글
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          label="작성"
                          type="submit"
                          className="text-primary border-primary w-20"
                          variant="outline"
                        />
                        <Button
                          label="취소"
                          className="w-20 !border-[var(--GrayScale-Gray20)] !text-[var(--GrayScale-Gray60)]"
                          variant="outline"
                          onClick={handleCloseReply}
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* 대댓글 */}
              {comment.replies.length > 0 && (
                <div className="relative">
                  <div className="absolute top-0 left-2">
                    <CornerDownRight className="size-4.5 text-gray-50" />
                  </div>
                  <div className="mt-3 ml-11 flex flex-col gap-2">
                    {comment.replies.map((reply: ReplyType) => (
                      <CommentItem
                        key={reply.replyId}
                        comment={reply}
                        isAuthor={isAuthor}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      <p className="text-text-sub2 mt-6 text-center text-sm">
        {isFetchingNextPage && '로딩 중이예요 ...'}
        {!hasNextPage && '모든 댓글을 불러왔어요 👋'}
      </p>
    </>
  );
};
