import { ApiResponse } from './common';

/*
댓글 조회
GET /v1/meetings/{id}/comments
*/
type CommentsType = ApiResponse<{
  content: {
    commentId: number;
    authorId: number;
    authorNickname: string;
    authorProfileImageUrl: string;
    content: string;
    secret: boolean;
    createdAt: string;
    replies: ReplyType[];
  }[];
  hasNext: boolean;
}>;

/*
대댓글 타입
*/
interface ReplyType {
  replyId: number;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
  content: string;
  secret: boolean;
  createdAt: string;
}

/*
댓글 생성
POST /v1/meetings/{id}/comments
*/
type CreateCommentResponse = ApiResponse<{
  commentId: number;
}>;

/*
댓글 수정
PUT /v1/meetings/{id}/comments/{commentId}
*/
type UpdateCommentResponse = ApiResponse<null | string>;

/*
댓글 삭제
DELETE /v1/meetings/{id}/comments/{commentId}
*/
type DeleteCommentResponse = ApiResponse<null | string>;

/*
대댓글 생성
POST /v1/meetings/{id}/comments/{commentId}/replies
*/
type CreateReplyResponse = ApiResponse<{
  commentId: number;
}>;

export type {
  CommentsType,
  ReplyType,
  CreateCommentResponse,
  UpdateCommentResponse,
  DeleteCommentResponse,
  CreateReplyResponse,
};
