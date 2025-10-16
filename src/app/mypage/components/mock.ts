import {
  UsageStatusType,
  LocationType,
  StorageType,
  StatusString,
} from '@/types/common';

// MeetingData 타입 정의
export interface MeetingData {
  groupId: number;
  title: string;
  category: 'DIVIDING' | 'SHOPPING';
  status: StatusString;
  usageStatus: UsageStatusType;
  location: LocationType;
  storage: StorageType[];
  thumbnailUrl: string;
  createdAt: string;
}

// API 응답 타입 정의
export interface MeetingApiResponse {
  message: string | null;
  data: {
    userId: number;
    isBookmarked?: boolean; // 찜한 모임에만
    items: MeetingData[];
  };
}

// 참여한 모임 데이터 (DIVIDING + SHOPPING 함께)
export const participatedMeetingsData: MeetingApiResponse = {
  message: null,
  data: {
    userId: 999,
    items: [
      // DIVIDING 데이터들
      {
        groupId: 1001,
        title: '건대 이마트에서 사과 소분하기',
        category: 'DIVIDING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '광진구',
          district: '건국동',
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-15T09:00:00',
      },
      {
        groupId: 1002,
        title: '홍대 근처에서 딸기 소분하기',
        category: 'DIVIDING',
        status: 'COMPLETED',
        usageStatus: 'IN_USE',
        location: {
          province: '서울특별시',
          city: '마포구',
          district: '상수동',
        },
        storage: ['COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-14T14:30:00',
      },
      {
        groupId: 1003,
        title: '강남역에서 바나나 소분하기',
        category: 'DIVIDING',
        status: 'COMPLETED',
        usageStatus: 'DONE',
        location: {
          province: '서울특별시',
          city: '강남구',
          district: '역삼동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-13T11:15:00',
      },
      {
        groupId: 1004,
        title: '신촌에서 포도 소분하기',
        category: 'DIVIDING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '서대문구',
          district: '신촌동',
        },
        storage: ['COOL', 'FREEZER'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-12T16:45:00',
      },
      // SHOPPING 데이터들
      {
        groupId: 2001,
        title: '건대 이마트에서 함께 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '광진구',
          district: '건국동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-15T08:30:00',
      },
      {
        groupId: 2002,
        title: '홍대 마트에서 장보기 모임',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'IN_USE',
        location: {
          province: '서울특별시',
          city: '마포구',
          district: '상수동',
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-14T13:20:00',
      },
      {
        groupId: 2003,
        title: '강남역 근처에서 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'DONE',
        location: {
          province: '서울특별시',
          city: '강남구',
          district: '역삼동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-13T10:00:00',
      },
      {
        groupId: 2004,
        title: '신촌 이마트에서 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '서대문구',
          district: '신촌동',
        },
        storage: ['COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-12T15:30:00',
      },
      {
        groupId: 2005,
        title: '잠실 롯데마트에서 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '송파구',
          district: '잠실동',
        },
        storage: ['NORMAL', 'COOL', 'FREEZER'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-11T12:15:00',
      },
      {
        groupId: 2006,
        title: '명동 마트에서 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '중구',
          district: '명동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-10T09:45:00',
      },
    ],
  },
};

// 내가 만든 모임 데이터 (DIVIDING + SHOPPING 함께)
export const hostMeetingsData: MeetingApiResponse = {
  message: null,
  data: {
    userId: 999,
    items: [
      // DIVIDING 데이터들
      {
        groupId: 3001,
        title: '건대 근처에서 오렌지 소분하기',
        category: 'DIVIDING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '광진구',
          district: '건국동',
        },
        storage: ['COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-15T07:00:00',
      },
      {
        groupId: 3002,
        title: '홍대에서 키위 소분하기',
        category: 'DIVIDING',
        status: 'COMPLETED',
        usageStatus: 'IN_USE',
        location: {
          province: '서울특별시',
          city: '마포구',
          district: '상수동',
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-14T12:00:00',
      },
      {
        groupId: 3003,
        title: '강남에서 체리 소분하기',
        category: 'DIVIDING',
        status: 'COMPLETED',
        usageStatus: 'DONE',
        location: {
          province: '서울특별시',
          city: '강남구',
          district: '역삼동',
        },
        storage: ['COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-13T09:30:00',
      },
      // SHOPPING 데이터들
      {
        groupId: 4001,
        title: '건대 이마트에서 장보기 모임',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '광진구',
          district: '건국동',
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-15T06:30:00',
      },
      {
        groupId: 4002,
        title: '홍대 마트에서 함께 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '마포구',
          district: '상수동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-14T11:00:00',
      },
      {
        groupId: 4003,
        title: '강남역 마트에서 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '강남구',
          district: '역삼동',
        },
        storage: ['COOL', 'FREEZER'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-13T08:45:00',
      },
      {
        groupId: 4004,
        title: '신촌 이마트에서 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'DONE',
        location: {
          province: '서울특별시',
          city: '서대문구',
          district: '신촌동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-12T14:20:00',
      },
      {
        groupId: 4005,
        title: '잠실 롯데마트에서 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'IN_USE',
        location: {
          province: '서울특별시',
          city: '송파구',
          district: '잠실동',
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-11T11:30:00',
      },
      {
        groupId: 4006,
        title: '명동 마트에서 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '중구',
          district: '명동',
        },
        storage: ['COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-10T08:15:00',
      },
      {
        groupId: 4007,
        title: '압구정 갤러리아에서 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '강남구',
          district: '압구정동',
        },
        storage: ['NORMAL', 'COOL', 'FREEZER'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-09T13:45:00',
      },
      {
        groupId: 4008,
        title: '이태원 하이마트에서 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '용산구',
          district: '이태원동',
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-08T10:00:00',
      },
    ],
  },
};

// 찜한 모임 데이터 (DIVIDING + SHOPPING 함께)
export const likedMeetingsData: MeetingApiResponse = {
  message: null,
  data: {
    userId: 999,
    isBookmarked: true,
    items: [
      // DIVIDING 데이터들
      {
        groupId: 5001,
        title: '사과 소분하기',
        category: 'DIVIDING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '경기도',
          city: '시흥시',
          district: '장곡동',
          detail: null,
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-09-26T09:00:00Z',
      },
      {
        groupId: 5002,
        title: '건대에서 딸기 소분하기',
        category: 'DIVIDING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '광진구',
          district: '건국동',
          detail: null,
        },
        storage: ['COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-15T10:30:00',
      },
      {
        groupId: 5003,
        title: '홍대 근처 바나나 소분하기',
        category: 'DIVIDING',
        status: 'COMPLETED',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '마포구',
          district: '상수동',
          detail: null,
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-14T15:45:00',
      },
      // SHOPPING 데이터들
      {
        groupId: 6001,
        title: '건대 이마트 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '광진구',
          district: '건국동',
          detail: null,
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-15T11:00:00',
      },
      {
        groupId: 6002,
        title: '홍대 마트에서 함께 장보기',
        category: 'SHOPPING',
        status: 'COMPLETED',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '마포구',
          district: '상수동',
          detail: null,
        },
        storage: ['NORMAL', 'COOL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-14T14:15:00',
      },
      {
        groupId: 6003,
        title: '강남역 롯데마트 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '강남구',
          district: '역삼동',
          detail: null,
        },
        storage: ['COOL', 'FREEZER'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-13T12:30:00',
      },
      {
        groupId: 6004,
        title: '신촌 이마트 장보기',
        category: 'SHOPPING',
        status: 'RECRUITING',
        usageStatus: 'UPCOMING',
        location: {
          province: '서울특별시',
          city: '서대문구',
          district: '신촌동',
          detail: null,
        },
        storage: ['NORMAL'],
        thumbnailUrl: '/images/item_dummy_image.png',
        createdAt: '2025-01-12T16:20:00',
      },
    ],
  },
};
