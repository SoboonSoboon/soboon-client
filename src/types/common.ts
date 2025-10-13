// ===== API 응답 공통 구조 =====
interface ApiResponse<T> {
  message: string | null;
  data: T;
}

interface SuccessResponse<T> {
  message: string;
  data: T;
}

interface ErrorResponse {
  message: string;
  data: null | string;
}

// ===== 상태 관련 =====
interface StatusType {
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
}

type StatusString = 'RECRUITING' | 'COMPLETED' | 'CLOSED';

type UsageStatusType = 'UPCOMING' | 'IN_USE' | 'DONE';

type MeetingStatusType = 'RECRUITING' | 'CONFIRMED' | 'COMPLETED';

// ===== 위치 정보 =====
interface LocationType {
  province: string;
  city: string;
  district: string;
  detail?: string | null;
}

interface DetailedLocationType {
  province: string;
  city: string;
  district: string;
  detail: string;
}

// ===== 사용자 정보 =====
interface UserInfoType {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

interface AuthorInfoType {
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
}

type RoleType = 'HOST' | 'PARTICIPANT';

// ===== 페이지네이션 =====
interface PaginationType {
  currentPage: number;
  size: number;
  hasNext: boolean;
}

// todo: PageInfoType와 SliceInfoType 스타일이 다름. 백엔드 개발자와 협의 후 리팩토링 필요
interface PageInfoType {
  currentPage: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

interface SliceInfoType {
  currentPage: number;
  size: number;
  hasNext: boolean;
}

// ===== 카테고리 =====
interface CategoryType {
  category:
    | '전체'
    | '신선식품'
    | '간편식'
    | '정육/수산'
    | '냉동식품'
    | '생필품'
    | '디지털기기'
    | '기타';
}

interface ProductType {
  productType:
    | '신선식품'
    | '간편식'
    | '정육/수산'
    | '냉동식품'
    | '생활/주방'
    | '디지털 기기'
    | '기타';
}

interface StorageType {
  storage: 'NORMAL' | 'FREEZER' | 'COOL';
}

// ===== 리뷰 관련 =====
interface ReviewOptionsType {
  key:
    | 'TIME_PROMISE'
    | 'KIND_AND_CARING'
    | 'SAME_AS_PHOTO'
    | 'FAST_RESPONSE'
    | 'GOOD_DISTRIBUTION';
  selected: boolean;
}

type ReviewKeyword =
  | 'TIME_PROMISE'
  | 'KIND_AND_CARING'
  | 'SAME_AS_PHOTO'
  | 'FAST_RESPONSE'
  | 'GOOD_DISTRIBUTION';

export type {
  // API 응답
  ApiResponse,
  SuccessResponse,
  ErrorResponse,

  // 상태
  StatusType,
  StatusString,
  UsageStatusType,
  MeetingStatusType,

  // 위치
  LocationType,
  DetailedLocationType,

  // 사용자
  UserInfoType,
  AuthorInfoType,
  RoleType,

  // 페이지네이션
  PaginationType,
  PageInfoType,
  SliceInfoType,

  // 카테고리
  CategoryType,
  ProductType,
  StorageType,

  // 리뷰
  ReviewOptionsType,
  ReviewKeyword,
};
