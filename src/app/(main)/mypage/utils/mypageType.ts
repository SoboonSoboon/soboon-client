import { LocationType, SliceInfoType, StorageType } from '@/types/common';

// 탭 타입 정의
export type MainTabType = 'host' | 'participate' | 'bookmark';
export type SubTabType = 'SHOPPING' | 'DIVIDING';

// API 응답 타입 정의 (무한스크롤 지원)
export interface MypageMeetingApiResponse {
  message: string | null;
  data: MyPageMeetingList;
}

export interface BookMarkListApiResPonse {
  message: string | null;
  data: BookMarkList;
}

// mypage 모임 리스트 (무한스크롤 지원) - 내가 만든 모임, 참여한 모임
interface MyPageMeetingList {
  content: MeetingItem[];
  sliceInfo: SliceInfoType;
  totalElements: number;
}

// mypage모임 item (내가 만든 모임, 참여한 모임)
export interface MeetingItem {
  groupId: number;
  title: string;
  category: Category;
  status: Status;
  usageStatus: UsageStatus;
  location: LocationType;
  productTypes: StorageType[];
  thumbnailUrl: string;
  createdAt: string;
  reviewStatus: { reviewedCount: number; totalCount: number };
  bookmarked: boolean;
  tags: string[];
}

// 북마크 리스트 (무한스크롤 지원) - totalElements 없음
export interface BookMarkList {
  content: BookMarkItem[];
  sliceInfo: SliceInfoType;
}

// 북마크 아이템 타입 (DIVIDING, SHOPPING) - storage 필드 사용, reviewStatus와 tags 없음
export interface BookMarkItem {
  groupId: number;
  title: string;
  category: Category;
  status: Status;
  usageStatus: UsageStatus;
  location: LocationType;
  storage: StorageType[];
  thumbnailUrl: string;
  createdAt: string;
  bookmarked: boolean;
}

export type Category = 'DIVIDING' | 'SHOPPING';
export type Status = 'RECRUITING' | 'COMPLETED' | 'CLOSED';
export type UsageStatus = 'UPCOMING' | 'IN_USE' | 'DONE';
