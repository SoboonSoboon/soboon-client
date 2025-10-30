export const MYPAGE_TAB_LABELS = Object.freeze([
  { value: 'host', label: '내가 만든 모임' },
  { value: 'participate', label: '참여한 모임' },
  { value: 'bookmark', label: '찜한 모임' },
]);

export const MYPAGE_SUB_TAB_LABELS = Object.freeze([
  { key: 'dividing', value: 'DIVIDING', label: '소분하기' },
  { key: 'shopping', value: 'SHOPPING', label: '장보기' },
]);

export const HEADER_MENU = {
  SHARING: {
    LABEL: '함께 소분하기',
    PATH: '/sharing',
    SIZE: 20,
    ICON: {
      DEFAULT: 'shopping-basket',
      GREEN: 'shopping-basket-green',
    },
  },
  SHOPPING: {
    LABEL: '함께 장보기',
    PATH: '/shopping',
    SIZE: 24,
    ICON: {
      DEFAULT: 'sharing-cart',
      GREEN: 'sharing-cart-green',
    },
  },
};
