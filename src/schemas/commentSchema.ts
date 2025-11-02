import * as z from 'zod/mini';

export const commentSchema = z.object({
  comment: z.string().check(
    z.refine((val) => val.length > 0, { message: '댓글을 입력해 주세요.' }),
    z.refine((val) => val.length <= 100, {
      message: '댓글은 100자 이하로 입력해 주세요.',
    }),
    z.refine((val: string) => !/<[^>]*>/i.test(val), {
      message: 'HTML 태그는 사용할 수 없습니다.',
    }),
  ),
});

export type CommentSchema = z.infer<typeof commentSchema>;
