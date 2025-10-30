export const mypageKeys = {
  all: ['mypage'],
  meetings: () => [...mypageKeys.all, 'meetings'],
  hostMeetings: (page, size, category) => [
    ...mypageKeys.meetings(),
    'host',
    page,
    size,
    category,
  ],
  participateMeetings: (page, size, category) => [
    ...mypageKeys.meetings(),
    'Participagte',
    page,
    size,
    category,
  ],
  bookmarksMeeting: (page, size, category) => [
    ...mypageKeys.meetings(),
    'bookmarks',
    page,
    size,
    category,
  ],
};
