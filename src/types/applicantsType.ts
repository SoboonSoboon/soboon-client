import { ApiResponse } from './common';

/*
주최자 only
모임 신청자 목록
GET /v1/meetings/{id}/applicants
*/
type ApplicantsMemberType = ApiResponse<{
  participants: {
    participantId: number;
    userId: number;
    userNickname: string;
    profileImageUrl: string;
    status: string;
  }[];
}>;

/*
신청자 only
모임 신청
POST /v1/meetings/{id}/applications
*/
type ApplyToMeetingResponse = ApiResponse<{
  participantId: number;
}>;

/*
신청자 only
모임 신청 취소
DELETE /v1/meetings/{id}/applications
*/
type CancelApplyToMeetingResponse = ApiResponse<null | string>;

/*
참여자 only
모임 신청 수락
POST /v1/meetings/{id}/applications/{applicationId}/approve
*/
type ApproveApplicantsResponse = ApiResponse<null | string>;

/*
참여자 only
신청 거절
POST /v1/meetings/{id}/applications/{applicationId}/reject
*/
type RejectApplicantsResponse = ApiResponse<null | string>;

/*
참여자 only
참여자 강퇴
POST /v1/meetings/{id}/applications/{applicationId}/kick
*/
type KickApplicantsResponse = ApiResponse<null | string>;

export type {
  ApplicantsMemberType,
  ApplyToMeetingResponse,
  CancelApplyToMeetingResponse,
  ApproveApplicantsResponse,
  KickApplicantsResponse,
  RejectApplicantsResponse,
};
