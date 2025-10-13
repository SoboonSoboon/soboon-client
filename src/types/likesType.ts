import { ApiResponse, CategoryType, LocationType, StorageType } from './common';

/*
좋아요한 모임 조회
GET /v1/me/likes
*/
type LikesType = ApiResponse<{
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
모임 좋아요
POST /v1/meetings/{id}/likes
*/
type LikeMeetingResponse = ApiResponse<null | string>;

/*
모임 좋아요 취소
DELETE /v1/meetings/{id}/likes
*/
type UnlikeMeetingResponse = ApiResponse<null | string>;

export type { LikesType, LikeMeetingResponse, UnlikeMeetingResponse };
