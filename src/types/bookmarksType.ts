import { ApiResponse, CategoryType, LocationType, StorageType } from './common';

/*
내가 북마크한 모임 목록 조회
GET /v1/me/bookmarks
*/
type BookmarksType = ApiResponse<{
  userId: number;
  isBookmarked: boolean;
  items: {
    groupId: number;
    title: string;
    category: CategoryType;
    status: string;
    usageStatus: string;
    location: LocationType;
    storage: StorageType;
    thumbnailUrl: string;
    createdAt: string;
  }[];
}>;

/*
모임 북마크 등록
POST /v1/meetings/{id}/bookmarks
*/
type BookmarkedMeetingResponse = ApiResponse<null | string>;

/*
모임 북마크 취소
DELETE /v1/meetings/{id}/bookmarks
*/
type UnbookmarkedMeetingResponse = ApiResponse<null | string>;

export type {
  BookmarksType,
  BookmarkedMeetingResponse,
  UnbookmarkedMeetingResponse,
};
