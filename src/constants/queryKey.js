export const mypageKeys = {
  all: ['mypage'],
  meetings: () => [...mypageKeys.all, 'meetings'],
  hostMeetings: (page, size) => [...mypageKeys.meetings(), 'host', page, size],
  participateMeetings: (page, size) => [
    ...mypageKeys.meetings(),
    'Participagte',
    page,
    size,
  ],
  bookmarksMeeting: (page, size) => [
    ...mypageKeys.meetings(),
    'bookmarks',
    page,
    size,
  ],
};
