import {
  ApiResponse,
  CategoryType,
  LocationType,
  MeetingStatusType,
  RoleType,
  StorageType,
  UsageStatusType,
} from './common';

/*
내가 만든, 내가 참여한 모임 목록
GET /v1/me/meetings/hosted
*/
type MyMeetingsType = ApiResponse<{
  userId: number;
  role: RoleType;
  items: {
    groupId: number;
    title: string;
    category: CategoryType;
    status: MeetingStatusType;
    usageStatus: UsageStatusType;
    location: LocationType;
    storage: StorageType[];
    thumbnailUrl: string;
    createdAt: string;
  }[];
}>;
export type { MyMeetingsType };
