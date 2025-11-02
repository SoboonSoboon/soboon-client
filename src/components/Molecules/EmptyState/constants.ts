// EmptyState 상수 정의
export const EMPTY_STATE_CONFIG = {
  // 탭별 접두사
  TAB_PREFIX: {
    host: '주최한',
    participate: '참여한',
    bookmark: '북마크한',
  },

  // 탭별 액션 메시지
  TAB_ACTION: {
    host: '만들어보세요!',
    participate: '참여해보세요!',
    bookmark: '북마크해보세요!',
  },

  // 서브탭별 제목 템플릿
  TITLE_TEMPLATE: {
    shopping: '아직 {prefix} 장보기 모임이 없어요',
    dividing: '아직 {prefix} 소분하기 모임이 없어요',
  },

  // 서브탭별 설명 템플릿
  DESCRIPTION_TEMPLATE: {
    shopping: {
      host: '첫 번째 장보기 모임을 만들어보세요!',
      participate: '다양한 장보기 모임에 참여해보세요!',
      bookmark: '다양한 장보기 모임에 북마크해보세요!',
    },
    dividing: {
      host: '첫 번째 소분하기 모임을 만들어보세요!',
      participate: '다양한 소분하기 모임에 참여해보세요!',
      bookmark: '다양한 소분하기 모임에 북마크해보세요!',
    },
  },

  // 버튼 텍스트
  BUTTON_TEXT: {
    shopping: {
      create: '장보기 모임 만들기',
      browse: '장보기 모임 둘러보기',
    },
    dividing: {
      create: '소분하기 모임 만들기',
      browse: '소분하기 모임 둘러보기',
    },
  },

  // 라우트 경로
  ROUTES: {
    shopping: {
      create: '/shopping/register',
      browse: '/shopping',
    },
    dividing: {
      create: '/dividing/register',
      browse: '/dividing',
    },
  },
} as const;
