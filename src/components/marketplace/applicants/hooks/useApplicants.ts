'use client';

import {
  approveApplicants,
  kickApplicants,
  rejectApplicants,
} from '@/action/applicantsAction';
import { getUserApplyStatus } from '@/apis';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { axiosInstance } from '@/apis/axiosInstance';
import { useToast } from '@/components/Atoms';
import { ApplicantsMemberType } from '@/types/applicantsType';
import { StatusString } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface UseApplicantsParams {
  meetingId: string;
  status: StatusString;
}

export const useApplicants = ({ meetingId, status }: UseApplicantsParams) => {
  const { success, error } = useToast();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const isCompletedOrClosed = status === 'COMPLETED' || status === 'CLOSED';

  // 내가 이 모임에 신청한 상태를 조회
  const { data: myApplyStatus } = useQuery({
    queryKey: ['myApplyStatus', meetingId],
    queryFn: async () => {
      const response = await getUserApplyStatus();
      return response.find((s) => s.meetingId === +meetingId) || null;
    },
    enabled: isLoggedIn,
  });

  // 이 모임에 신청한 사람들을 조회
  const { data: approvedParticipants } = useQuery<
    ApplicantsMemberType['data'][]
  >({
    queryKey: ['approvedParticipants', meetingId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/v1/meetings/${meetingId}/applicants`,
      );
      return response.data.data || [];
    },
    enabled:
      isCompletedOrClosed && myApplyStatus?.participationStatus === 'APPROVED',
  });

  // 이 모임에 신청한 사람들 중 참여 확정된 사람들만 필터링
  const filteredParticipants = useMemo(() => {
    return approvedParticipants?.filter(
      (participant) => participant.status === 'APPROVED',
    );
  }, [approvedParticipants]);

  // 액션 핸들러들
  const handleApprove = async (applicationId: number) => {
    const response = await approveApplicants(null, applicationId, meetingId);
    if (response) {
      success(response.message || '모임 신청을 수락했어요.');
    } else {
      error('모임 신청을 수락하지 못했어요.');
    }
  };

  const handleKick = async (applicationId: number) => {
    const response = await kickApplicants(null, applicationId, meetingId);
    if (response) {
      success(response.message || '참여자를 강퇴했어요.');
    } else {
      error('참여자를 강퇴하지 못했어요.');
    }
  };

  const handleReject = async (applicationId: number) => {
    const response = await rejectApplicants(null, applicationId, meetingId);
    if (response) {
      success(response.message || '모임 신청을 거절했어요.');
    } else {
      error('모임 신청을 거절하지 못했어요.');
    }
  };

  return {
    isCompletedOrClosed,
    myApplyStatus,
    filteredParticipants,
    handleApprove,
    handleKick,
    handleReject,
  };
};
