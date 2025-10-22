import { LocationType } from '@/types/common';

//리뷰 임시 데이터
export const reviewData = {
  meetingId: 1001,
  category: 'DIVIDING' as const,
  targets: {
    userId: 101,
    nickname: '홍길동',
    profileImageUrl: '',
  },
  reviewer: true,
};

// API 응답 타입 정의
export interface MypageMeetingApiResponse {
  message: string | null;
  data: MyPageMeetingList;
}
export interface BookMarkListApiResPonse {
  message: string | null;
  data: BookMarkList;
}
// // 참여한 모임 데이터 (DIVIDING + SHOPPING 함께)

// //mypage모임 api
interface MyPageMeetingList {
  userId: number;
  role: 'HOST' | 'PARTICIPANT';
  items: MeetingItem[];
}
// mypage모임 item (내가 만든 모임, 참여한 모임)

export interface MeetingItem {
  groupId: number;
  title: string;
  category: Category;
  status: Status;
  usageStatus: UsageStatus;
  location: LocationType;
  storage: Storage[];
  thumbnailUrl: string;
  createdAt: string;
  reviewStatus?: { reviewedCount: string; totalCount: string };
  bookmarked: boolean;
}
export interface BookMarkList {
  userId: number;
  bookmarked: boolean;
  items: BookMarkItem[];
}
// 북마크 아이템 타입 (DIVIDING, SHOPPING)
export interface BookMarkItem {
  reviewStatus: { reviewedCount: string; totalCount: string };
  groupId: number;
  title: string;
  category: Category;
  status: Status;
  usageStatus: UsageStatus;
  location: LocationType;
  storage: Storage[];
  thumbnailUrl: string;
  createdAt: string;
  bookmarked: boolean;
}

export type Storage =
  | 'FRESH'
  | 'EASY_MEAL'
  | 'FROZEN'
  | 'LIVING_KITCHEN'
  | 'COOL'
  | 'DIGITAL'
  | 'ETC';
export type Category = 'DIVIDING' | 'SHOPPING';
export type Status = 'RECRUITING' | 'COMPLETED' | 'CLOSED';
export type UsageStatus = 'UPCOMING' | 'IN_USE' | 'DONE';
