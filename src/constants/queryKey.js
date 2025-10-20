export const mypageKeys = {
  all: ['mypage'],
  meetings: () => [...mypageKeys.all, 'meetings'],
  hostMeetings: (page, size) => [...mypageKeys.meetings(), 'host', page, size],
};
