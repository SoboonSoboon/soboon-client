export const timeFormatter = (createdAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffTime = now.getTime() - created.getTime();

  const diffInMinutes = Math.floor(diffTime / (1000 * 60));
  const diffInHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInMinutes < 60) {
    return diffInMinutes < 1 ? '방금 전' : `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else if (diffInWeeks <= 4) {
    // 4주 이하까지는 상대적 시간
    return `${diffInWeeks}주 전`;
  } else {
    // 4주 초과부터는 날짜로 표시
    return created.toLocaleDateString('ko-KR');
  }
};
