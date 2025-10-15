import {
  StatusType,
  ProductType,
  ApiResponse,
  LocationType,
  SliceInfoType,
  PageInfoType,
} from './common';

/*
모임 상세
GET /v1/meetings/{id}
*/
type MeetingDetailType = ApiResponse<{
  id: number;
  title: string;
  item: string;
  location_dep0: string;
  location_dep1: string;
  location_dep2: string;
  detail_address: string;
  images: string[];
  status: StatusType;
  description: string;
  current_member: number;
  total_member: number;
  category: string;
}>;

/*
모임 수정
PUT /v1/meetings/{id}
*/
type UpdateMeetingResponseType = ApiResponse<null | string>;

/*
모임 삭제
DELETE /v1/meetings/{id}
*/
type DeleteMeetingResponseType = ApiResponse<null | string>;

/*
소분 content 타입
*/
interface DividingContentType {
  groupId: number;
  item: string;
  image: string;
  productType: ProductType;
  location: LocationType;
}

/*
모임 소분 목록 조회
GET /v1/meetings/dividing
*/
type DividingMeetingsType = ApiResponse<{
  content: DividingContentType[];
  sliceInfo: SliceInfoType;
}>;

/*
장보가 content 타입
*/
interface ShoppingContentType {
  groupId: number;
  title: string;
  location: LocationType;
  status: StatusType;
  currentMember: number;
  createdAt: string;
}

/*
장보기 모임 목록 조회
GET /v1/meetings/shopping
*/
type ShoppingMeetingsType = {
  content: ShoppingContentType[];
  pageInfo: PageInfoType;
};

/*
장보기 모임 생성
POST /v1/meetings/shopping	
*/
type CreateShoppingMeetingResponseType = ApiResponse<{
  meetingId: number;
}>;

/*
소분 모임 생성
POST /v1/meetings/dividing
*/
type CreateDividingMeetingResponseType = ApiResponse<{
  meetingId: number;
}>;

export type {
  MeetingDetailType,
  UpdateMeetingResponseType,
  DeleteMeetingResponseType,
  DividingMeetingsType,
  ShoppingMeetingsType,
  ShoppingContentType,
  CreateShoppingMeetingResponseType,
  CreateDividingMeetingResponseType,
};
