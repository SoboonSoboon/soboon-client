export const timeFormatter = (createdAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffTime = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  if (diffMinutes >= 60 && diffMinutes < 1440) {
    return `${Math.floor(diffMinutes / 60)}시간 전`;
  }
  if (diffMinutes >= 1440 && diffMinutes < 43200) {
    return `${Math.floor(diffMinutes / 1440)}일 전`;
  }
  return `${Math.floor(diffMinutes / 43200)}개월 전`;
};
